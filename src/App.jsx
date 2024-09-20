import { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import DefaultPage from "./components/DefaultPage.jsx";
import ProjectPage from "./components/ProjectPage.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(false);

  function handleNewProject(buttonType) {
    setNewProject(buttonType);
  }

  function handleProjectsArray(project) {
    setProjects([...projects, project]);
    setNewProject(false);
  }

  const pages = new Map([
    [
      true,
      <ProjectForm
        onSave={handleProjectsArray}
        onCancel={() => setNewProject(false)}
        projectsArray={projects}
      />,
    ],
    [false, <DefaultPage onCreate={() => handleNewProject(true)} />],
  ]);

  function getPagesKind(key) {
    return (
      pages.get(key) || [
        <ProjectPage
          key={newProject}
          projectsArray={projects}
          buttonKey={newProject}
          handleClick={handleNewProject}
          onChangeProjects={setProjects}
        />,
      ]
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        handleClick={handleNewProject}
        projectsArray={projects}
        currentProject={newProject}
      />
      {getPagesKind(newProject)}
    </main>
  );
}

export default App;
