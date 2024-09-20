import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import FormValue from "./FormValue.jsx";
import Modal from "./Modal.jsx";

export default function ProjectForm({ onSave, onCancel, projectsArray }) {
  const modal = useRef();
  const [alert, setAlert] = useState();

  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSaveData() {
    const existingProject = projectsArray.some(
      (project) => project.title === title.current.value
    );

    if (existingProject) {
      setAlert(
        <>
          <p className="text-stone-600 mb-4">
            Oops ... looks like you have already created this project.
          </p>
          <p className="text-stone-600 mb-4">
            Please first delete the existing project if you want to create a new
            one with the same title or in case you want to edit its items.
          </p>
        </>
      );
      modal.current.open();
      return;
    }

    if (
      title.current.value != "" &&
      description.current.value != "" &&
      date.current.value != ""
    ) {
      const newProject = {
        title: title.current.value,
        description: description.current.value,
        date: date.current.value,
      };
      onSave(newProject);
    } else {
      setAlert(
        <>
          <p className="text-stone-600 mb-4">
            Oops ... looks like you forgot to enter a value.
          </p>
          <p className="text-stone-600 mb-4">
            Please make sure you provide a valid value for every input field.
          </p>
        </>
      );
      modal.current.open();
      return;
    }
  }

  return createPortal(
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        {alert}
      </Modal>
      <div className="absolute left-[33%] w-2/3 mt-16 px-[5%]">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              type="button"
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleSaveData}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <FormValue title="TITLE" type="text" ref={title} />
          <FormValue title="DESCRIPTION" type="textarea" ref={description} />
          <FormValue title="DUE DATE" type="date" ref={date} />
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
