# Text

In this lesson, we will add capability to create a task under a project.

Let's open `src/pages/project_details/ProjectDetails.tsx` in VS Code.

We will add a `button` wrapped in `Link` to navigate to `tasks/new` url, so that we can render a modal window. The button should have `newTaskBtn` as it's `id`.

```tsx
import { Link, useParams } from "react-router-dom";


const ProjectDetails = () => {
  const { projects } = useContext(ProjectContext);
  let { projectID } = useParams();
  const selectedProject = projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];
  if (!selectedProject) {
    return <>No such Project!</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject?.name}
        </h2>
         <Link to={`tasks/new`}>
          <button id="newTaskBtn" className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            New Task
          </button>
        </Link>
      </div>
    </>
  );
};
```

Save the file.

Now if you visit the project details page, you will see a `New Task` button. If you click on it, it will take you to `/accounts/project/:projectID/tasks/new` route.

Next, we will render a modal window, which will accept `title`, `description`, `dueDate` and `assignee` from user and then create a task.

Let's create a folder named `tasks` in `src/pages`. Inside this folder, let's create another folder named `newTask`. create a file named `NewTask.tsx` in `src/pages/tasks/newTask` folder with following content.

```tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../config/constants";
import { ProjectContext } from "../../../contexts/ProjectContext";

const NewTask = () => {
  let [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  let { projectID } = useParams();
  let navigate = useNavigate();
  const { projects } = useContext(ProjectContext);
  const selectedProject = projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(
        `${API_ENDPOINT}/projects/${projectID}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, dueDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      // extract the response body as JSON data
      await response.json();

      // Close modal
      setIsOpen(false);
      navigate("../../");
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        autoFocus
                        name="name"
                        id="name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        autoFocus
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        autoFocus
                        name="dueDate"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setDueDate(e.target.value);
                        }}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />

                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        id="newTaskSubmitBtn"
                        type="submit"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewTask;
```

Save the file.

This is very similar to the modal window used to create a new project. Here, we use `navigate` hook from `react-router-dom` to control the redirection of browser after creating a task or when the modal window is closed.

To create a task, we are sending the API request when the form is submitted. In this component also, we do some sanity checks like, whether the project id in the url is valid or not.

Next, we will create a wrapper component to provide project details to this component using `context`.

Let's create a file named `index.tsx` in `src/pages/tasks/newTask` with following content.

```tsx
import React from "react";

import NewTask from "./NewTask";
import { ProjectProvider } from "../../../contexts/ProjectContext";

const NewTaskModal: React.FC = () => {
  return (
    <ProjectProvider>
      <NewTask />
    </ProjectProvider>
  );
};

export default NewTaskModal;
```

We use `context` to pass down already fetched project list to the `NewTask` component.

Save the file.

Next we need to update the `src/routes/index.tsx` to render this component for a new task route.

Open `src/routes/index.tsx` in VS Code.

Import the `NewTaskModal` component.

```tsx
import NewTaskModal from "../pages/tasks/newTask";
```

Next, we will ask router to render this component for new task url.

```tsx
{
  path: "projects",
  children: [
    { index: true, element: <Projects /> },
    {
      path: ":projectID",
      element: <ProjectDetails />,
      children: [
        { index: true, element: <></> },
        {
          path: "tasks",
          children: [
            { index: true, element: <Navigate to="../" replace /> },
            { path: "new", element: <NewTaskModal /> },
            {
              path: ":taskID",
              children: [{ index: true, element: <>Show Task Details</> }],
            },
          ],
        },
      ],
    },
  ],
}
```

Save the file. Now if you click on `New Task` button in project details page, it will show a modal where you can provide a `title`, `description` and `dueDate`. On submitting the form, it will also invoke the API and create a task. You can verify it by opening the `Network` tab of developer console of your browser.

We currently don't display the tasks associated with the project. Let's do that in the next lesson.
