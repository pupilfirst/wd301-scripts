# Text

In this lesson, we will add capability to create a task under a project.

Let's open `src/pages/project_details/ProjectDetails.tsx` in VS Code.

We will add a `button` wrapped in `Link` to navigate to `tasks/new` url, so that we can render a modal window. The button should have `newTaskBtn` as it's `id`.

```tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
  const projectState = useProjectsState();

  const selectedProject = projectState?.activeProject;

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject.name}
        </h2>
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            New Task
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProjectDetails;
```

Save the file.

Now if you visit the project details page, you will see a `New Task` button. If you click on it, it will take you to `/accounts/project/:projectID/tasks/new` route.

Next, we will render a modal window, which will accept `title`, `description`, and `dueDate` from user and then create a task.

We have to first create and setup a context, actions and reducer like we did while creating a project.

Let's create a folder `task` in `src/context`. We will next create empty files `actions.ts`, `context.tsx`, `reducer.ts`, and `types.ts`.

Open `src/context/task/types.ts` and add actions for the API request. We will also create a `TaskListState` to hold loading status of API requests and a `TasksDispacth` type to be used with context. We will use `enum` to store the list of actions available.

```ts
export interface TaskListState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Actions that are available
export enum TaskListAvailableAction {
  CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE",
}

// Create a type to hold list of actions that can be dispatched
export type TaskActions =
  | { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type TasksDispatch = React.Dispatch<TaskActions>;
```

Save the file.

Next, we need to create a reducer. Open `src/context/task/reducer.ts`. Here, we will update the state based on action that is dispatched. We will toggle the `isLoading` to true when the request is initiated. Then, we will turn it to `false` when the request succeeds, or update the state with an error message.

```tsx
import { Reducer } from "react";
import { TaskListAvailableAction, TaskListState, TaskActions } from "./types";
// Define the initial state
export const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const taskReducer: Reducer<TaskListState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // Toggle the `isLoading` to true when request is initiated.
    case TaskListAvailableAction.CREATE_TASK_REQUEST:
      return { ...state, isLoading: true };

    // Toggle the `isLoading` to false when request is succesfull or errored.
    case TaskListAvailableAction.CREATE_TASK_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
```

Now we have our reducer ready.

Next, we need to add the actual API call that needs to be invoked to create a task.

Let's open `src/context/task/actions.ts` and update it as per the following code.

```tsx

// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import {
  TaskDetailsPayload,
  TaskListAvailableAction,
  TasksDispatch,
} from "./types";

// The function will take a dispatch as first argument, which can be used to send an action to `reducer` and update the state accordingly
export const addTask = async (
  dispatch: TasksDispatch,
  projectID: string,
  task: TaskDetailsPayload
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    // The following action will toggle `isLoading` to `true`
    dispatch({ type: TaskListAvailableAction.CREATE_TASK_REQUEST });

    // Invoke the backend server with POST request and create a task.
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    // Turn `isLoading` to `false`
    dispatch({ type: TaskListAvailableAction.CREATE_TASK_SUCCESS });
  } catch (error) {
    console.error("Operation failed:", error);
    // Update error status in the state.
    dispatch({
      type: TaskListAvailableAction.CREATE_TASK_FAILURE,
      payload: "Unable to create task",
    });
  }
};
```

Save the file.

Here, we don't have `TaskDetailsPayload` type yet, so let's define it in `types.ts`

```tsx
export type TaskDetailsPayload = {
  title: string;
  description: string;
  dueDate: string;
};
```

Switch back to `actions.ts`.

In this file, we provide a `dispatch`, `projectID`, and `task` to create a new task. We are sending a POST request to `{API_ENDPOINT}/projects/{projectID}/tasks/` as mentioned in [Create Task API doc](https://wd301-api.pupilfirst.school/#/Tasks/post_projects__projectId__tasks)

Next, we need to create a context, so that we can pass around the state and actions to components. Open `src/context/task/context.tsx` and create `TasksStateContext` and `TasksDispatchContext` similar to how we added `ProjectsStateContext` and `ProjectsDispatchContext` . We will also create `useTasksState` and `useTasksDispatch` hooks to make the context easier to use in components.

```tsx
import React, { createContext, useContext, useReducer } from "react";
import { taskReducer, initialState } from "./reducer";
import { TaskListState, TasksDispatch } from "./types";
const TasksStateContext = createContext<TaskListState>(initialState);
const TasksDispatchContext = createContext<TasksDispatch>(() => {});
export const TasksProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TasksStateContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
export const useTasksState = () => useContext(TasksStateContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);
```

Next, we will use this context to pass the list of tasks to the `ProjectDetail` component.

Open `index.tsx` file from `src/pages/project_details` folder in VS Code and import the newly created context in it.

```tsx
import { TasksProvider } from "../../context/task/context";
```

We will wrap the `ProjectDetails` component with `TasksProvider`, so that values passed in the context are available in `ProjectDetails` component.

```tsx
const ProjectDetailsContainer: React.FC = () => {
  return (
    <TasksProvider>
      <ProjectDetails />
      <Outlet />
    </TasksProvider>
  );
};
```

Now, we have to create the modal window component. We will use something similar to the window used to create a new project.
Let's create a folder named `tasks` in `src/pages`. Inside this folder, let's create a file named `NewTask.tsx` with following content. We will use `react-hook-form` to manage the form. We will register three elements with react-hook-form. ie, `title`, `description` and `dueDate`.

```tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch } from "../../context/task/context";
import { addTask } from "../../context/task/actions";
import { TaskDetailsPayload } from "../../context/task/types";

const NewTask = () => {
  let [isOpen, setIsOpen] = useState(true);

  let { projectID } = useParams();
  let navigate = useNavigate();

  // Use react-hook-form to create form submission handler and state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskDetailsPayload>();
  const projectState = useProjectsState();
  const taskDispatch = useTasksDispatch();

  // We do some sanity checks to make sure the `projectID` passed is a valid one
  const selectedProject = projectState?.activeProject;
  if (!selectedProject) {
    return <>No such Project!</>;
  }
  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  const onSubmit: SubmitHandler<TaskDetailsPayload> = async (data) => {
    try {
      // Invoke the actual API and create a task.
      addTask(taskDispatch, projectID ?? "", data);
      closeModal();
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        autoFocus
                        id="title"
                        // Register the title field
                        {...register("title", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        autoFocus
                        id="description"
                        // register the description field
                        {...register("description", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        autoFocus
                        id="dueDate"
                        // register due date field
                        {...register("dueDate", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <button
                        type="submit"
                        // Set an id for the submit button
                        id="newTaskSubmitBtn"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
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

We use `context` to pass down already fetched project list to the `NewTask` component.

Next we need to update the `src/routes/index.tsx` to render this component for a new task route.

Open `src/routes/index.tsx` in VS Code.

Import the `NewTask` component.

```tsx
import NewTask from "../pages/tasks/NewTask";
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
            { index: true, element: <Navigate to="../" /> },
            {
              path: "new",
              // Render `NewTask` component
              element: <NewTask />,
            },
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
