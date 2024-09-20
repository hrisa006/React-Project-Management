import { useRef } from "react";
import { createPortal } from "react-dom";

import Task from "./Task.jsx";

export default function ProjectPage({
  projectsArray,
  buttonKey,
  handleClick,
  onChangeProjects,
}) {
  const task = useRef();

  function handleDelete() {
    const newArray = projectsArray.filter(
      (project) => project.title !== buttonKey
    );
    onChangeProjects(newArray);
    handleClick(false);
  }

  function handleTaskArray() {
    if (task.current.value.trim() === "") {
      return;
    }
    const updatedProjects = projectsArray.map((project) => {
      if (project.title === buttonKey) {
        return {
          ...project,
          tasks: [...(project.tasks || []), task.current.value],
        };
      }
      return project;
    });

    onChangeProjects(updatedProjects);
    task.current.value = "";
  }

  function handleTaskDelete(taskToClear) {
    const updatedProjects = projectsArray.map((project) => {
      if (project.title === buttonKey) {
        return {
          ...project,
          tasks: project.tasks.filter((task) => task !== taskToClear),
        };
      }
      return project;
    });

    onChangeProjects(updatedProjects);
  }

  const currentProject = projectsArray.find(
    (project) => project.title === buttonKey
  );

  const formattedDate = new Date(currentProject.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return createPortal(
    <div className="absolute left-[33%] w-2/3 mt-16 px-[5%]">
      {currentProject && (
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {currentProject.title}
            </h1>
            <button
              className="text-stone-600 hover:text-stone-950"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            {currentProject.description}
          </p>
        </header>
      )}
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <div className="flex items-center gap-4">
          <input
            id="task"
            type="text"
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            ref={task}
          />
          <button
            className="text-stone-700 hover:text-stone-950"
            onClick={handleTaskArray}
          >
            Add Task
          </button>
        </div>
        {currentProject.tasks ? (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {currentProject.tasks.map((taskItem, index) => (
              <Task
                key={`${taskItem}-${index}`}
                title={taskItem}
                onClear={handleTaskDelete}
              />
            ))}
          </ul>
        ) : (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
      </section>
    </div>,
    document.getElementById("modal-root")
  );
}
