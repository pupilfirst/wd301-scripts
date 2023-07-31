# Text

In this lesson, we will display the details of a task when user clicks on it.

Currently, we have a placeholder component that renders `Show Task Details` text when a `/accounts/projects/:projectID/tasks/:taskID` route is visited.

Let's add update actions to `src/context/tasks/types.ts` file. Also we will update the `taskReducer` to handle dispatches to these actions.

```tsx
export enum TaskListAvailableAction {
  FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE",

  DELETE_TASKS_REQUEST = "DELETE_TASKS_REQUEST",
  DELETE_TASKS_SUCCESS = "DELETE_TASKS_SUCCESS",
  DELETE_TASKS_FAILURE = "DELETE_TASKS_FAILURE",

  CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE",
  
  // Add action types
  UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST",
  UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS",
  UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}

export type TaskActions =
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_REQUEST }
  | { type: TaskListAvailableAction.FETCH_TASKS_SUCCESS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.DELETE_TASKS_REQUEST }
  | { type: TaskListAvailableAction.DELETE_TASKS_SUCCESS }
  | { type: TaskListAvailableAction.DELETE_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string }
  | { type: TaskListAvailableAction.UPDATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.UPDATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.UPDATE_TASK_FAILURE; payload: string };
```

Let's update the reducer as well. Open `src/context/tasks/reducer.ts`

```tsx
export const taskReducer: Reducer<TaskListState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TaskListAvailableAction.FETCH_TASKS_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.FETCH_TASKS_SUCCESS:
      return { ...state, isLoading: false, projectData: action.payload };
    case TaskListAvailableAction.FETCH_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case TaskListAvailableAction.DELETE_TASKS_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.DELETE_TASKS_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.DELETE_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case TaskListAvailableAction.CREATE_TASK_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.CREATE_TASK_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    // Toggle the loading state based on action
    case TaskListAvailableAction.UPDATE_TASK_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.UPDATE_TASK_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case TaskListAvailableAction.REORDER_TASKS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
```

Save the file.

Now, let's open the `src/context/tasks/action.ts` file. We will add [API call to update a task](https://wd301-api.pupilfirst.school/#/Tasks/patch_projects__projectId__tasks__id_). Once we update, we will then issue a `refreshTasks` call to fetch the latest list of tasks.

```tsx
export const updateTask = async (
  dispatch: TasksDispatch,
  projectID: string,
  task: TaskDetails
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    // Display loading status
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    // Display success and refresh the tasks
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_SUCCESS });
    refreshTasks(dispatch, projectID);
  } catch (error) {
    console.error("Operation failed:", error);
    // Display error status
    dispatch({
      type: TaskListAvailableAction.UPDATE_TASK_FAILURE,
      payload: "Unable to update task",
    });
  }
};
```

Now, we will create a component to actually render the details of a task. Let's create a file named `TaskDetails.tsx` in `src/pages/tasks` folder with following content. The component is very similar to `NewTask` component, except, we hydrate the initial values like title, due date, description etc. based on the task. We will also create a type `TaskFormUpdatePayload` to represent the data that is being sent to server for updating a task.

```tsx
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/tasks/context";
import { updateTask } from "../../context/tasks/actions";

import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/tasks/types";

type TaskFormUpdatePayload = TaskDetailsPayload;

// Helper function to format the date to YYYY-MM-DD format
const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format the date as per the required format for the date picker (YYYY-MM-DD)
  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  let [isOpen, setIsOpen] = useState(true);

  let { projectID, taskID } = useParams();
  let navigate = useNavigate();

  // Extract project and task details.
  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const taskDispatch = useTasksDispatch();

  const selectedProject = projectState?.activeProject;

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
  // Use react-form-hook to manage the form. Initialize with data from selectedTask.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      dueDate: formatDateForPicker(selectedTask.dueDate),
    },
  });

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    closeModal();
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
                    Task Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        id="title"
                        {...register("title", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        id="description"
                        {...register("description", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        id="dueDate"
                        {...register("dueDate", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                      <button
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

export default TaskDetails;
```

Here, we wire up the details of a task to input fields and sets up handlers to update them. We also have to add a helper function to format the date, so that date picker can display the already selected `dueDate`.

Save the file.

Next, we can invoke the `updateTask` when the form is submitted. We will make use of the null coelecing operator (`??`) to provide default values.

```tsx
const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
  updateTask(taskDispatch, projectID ?? "", {
    ...selectedTask,
    ...data,
  });
  closeModal();
};
```

Save the file.

Next, we will create a container component to display a loading status if the data is still not ready.

Let's create a file named `TaskDetailsContainer.tsx` with following content:

```tsx
import React from "react";
import { useProjectsState } from "../../context/projects/context";
import { useTasksState } from "../../context/tasks/context";
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";

const TaskDetailsContainer = () => {
  let { taskID } = useParams();
  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const isFetchingTasks = taskListState.isLoading;
  const selectedTask = taskListState.projectData.tasks?.[taskID || ""];
  // We will render a loader based on the status,
  // We make sure, the tasks have been fetched, project is a valid one.
  if (isFetchingTasks || !projectState || projectState?.isLoading) {
    return <>Loading...</>;
  }
  if (!selectedTask) {
    return <>No such task!</>;
  }

  return <TaskDetails />;
};

export default TaskDetailsContainer;
```

Save the file. This will display a `Loading...` text if the requests has not yet completed fetching data.

Now, we will use this in the `src/routes/index.tsx` to render task details.

Switch to `src/routes/index.tsx`. Import the component.

```tsx
import TaskDetailsContainer from "../pages/tasks/TaskDetailsContainer";
```

Update the component to be rendered on visiting task details page.

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
              element: <NewTask />,
            },
            {
              path: ":taskID",
              children: [
                { index: true, element: <TaskDetailsContainer /> },
              ],
            },
          ],
        },
      ],
    },
  ],
},
```

Save the file.

Now, if we click on any task, it will display a modal window and the task details are already populated within it. We can change the title or description. When we click on update or submit the form, it will send a `PATCH` request and the task list will get refreshed automatically.

One other feature missing is updating the state of a task when it is dragged and dropped into a different list. Let's resolve that also.

Open `DragDropList.tsx` and import `updateTask` from `action.ts`

```tsx
import { reorderTasks, updateTask } from "../../context/tasks/actions";
```

Now, we just need to invoke the `updateTask` after changing the status of the task when drag and drop action is ended. We do that in `onDragEnd` function. We only need to update the state of task if the `startKey` and `finishKey` are different.

```tsx
import { useParams } from "react-router-dom";

// ...

const taskDispatch = useTasksDispatch();
const { projectID } = useParams();
const onDragEnd: OnDragEndResponder = async (result) => {
  // ...
  reorderTasks(taskDispatch, newState);
  const updatedTask = props.data.tasks[updatedItems[0]];
  updatedTask.state = finishKey;
  updateTask(taskDispatch, projectID ?? "", updatedTask);
};
```

Save the file. Now the status of the task will also persist once it is moved around the lists.

Currently, we haven't added the capability to assign a task to a user yet. We will do that in the next lesson.
