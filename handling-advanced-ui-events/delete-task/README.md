# Text

In this lesson, we will learn how to trigger a request to delete a task.

Let's first add available actions in `src/reducers/task.tsx`

```tsx
export enum TaskListAvailableAction {
  FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE",

  DELETE_TASKS_REQUEST = "DELETE_TASKS_REQUEST",
  DELETE_TASKS_SUCCESS = "DELETE_TASKS_SUCCESS",
  DELETE_TASKS_FAILURE = "DELETE_TASKS_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}

export type TaskActions =
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_REQUEST }
  | { type: TaskListAvailableAction.FETCH_TASKS_SUCCESS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.DELETE_TASKS_REQUEST }
  | { type: TaskListAvailableAction.DELETE_TASKS_SUCCESS }
  | { type: TaskListAvailableAction.DELETE_TASKS_FAILURE; payload: string };
```

Next, we will add these actions into the reducer to updated state.

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
    case TaskListAvailableAction.REORDER_TASKS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
```

The reducer does nothing fancy. We just toggle the loading state. Save the file.

Open `TaskContext.tsx` in VS Code. We will add a function in the context to handle delete functionality. You will have to import `TaskDetails` from `src/reducers/types`.

```tsx
import { ProjectData, TaskDetails, TaskListState } from "../reducers/types";
```

`TaskContextType` will look like:

```tsx
interface TaskContextType {
  taskListState: TaskListState;
  reorderTasks: (data: ProjectData) => void;
  refreshTasks: () => void;
  deleteTask: (task: TaskDetails) => void;
}
```

We will now add a method to invoke the `DELETE` API to delete a task. This will also be wrapped in `useCallback` hook for performance reasons.

```tsx
const deleteTask = useCallback(
  async (task: TaskDetails) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: TaskListAvailableAction.DELETE_TASKS_REQUEST });
      const response = await fetch(
        `${API_ENDPOINT}/projects/${projectID}/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      dispatch({ type: TaskListAvailableAction.DELETE_TASKS_SUCCESS });
      refreshTasks();
    } catch (error) {
      console.error("Operation failed:", error);
      dispatch({
        type: TaskListAvailableAction.DELETE_TASKS_FAILURE,
        payload: "Unable to delete task",
      });
    }
  },
  [refreshTasks, projectID]
);
```

Once the item is deleted, the tasks are again fetched from server by reusing the `fetchTasks` function.

Next, we need to pass the `deleteTask` function to the context.

```tsx
<TaskActionsContext.Provider
  value={{
    taskListState: state,
    reorderTasks,
    refreshTasks,
    deleteTask,
  }}
>
  {children}
</TaskActionsContext.Provider>
```

Now, we can wire this `deleteTask` function to the delete button on each task item.

Open `Task.tsx`. And we will import required packages.

```tsx
import React, { forwardRef, useContext } from "react";
import { TaskActionsContext } from "../../contexts/TaskContext";
```

Now, we can extract the `deleteTask` function from the context to this component. Then invoke it with the `task` item whenever the thrash icon is clicked

```tsx
const Container = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ task: TaskDetails }>
>((props, ref) => {
  const { task } = props;
  const { deleteTask } = useContext(TaskActionsContext);
  return (
    <div ref={ref} {...props} className="m-2 flex">
      <Link
        className="TaskItem w-full shadow-md border border-slate-100 bg-white"
        to={`tasks/${task.id}`}
      >
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div>
            <h2 className="text-base font-bold my-1">{task.title}</h2>
            <p className="text-sm text-slate-500">
              {new Date(task.dueDate).toDateString()}
            </p>
            <p className="text-sm text-slate-500">
              Description: {task.description}
            </p>
          </div>
          <button
            className="deleteTaskButton cursor-pointer h-4 w-4 rounded-full my-5 mr-5"
            onClick={(event) => {
              event.preventDefault();
              deleteTask(task);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 fill-red-200 hover:fill-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </div>
      </Link>
    </div>
  );
});
```

Save the file. Now, we shoul be able to click on the trash icon to delete a task.

## Refresh the list when creating a new task

Right now, if we create a task, it doesn't get reflected in the list. Let's fix that as well.

First let's add a type for the payload that is being sent to create a task.

Open `src/reducers/types.ts`

```tsx
export type TaskDetailsPayload = Omit<TaskDetails, "id" | "assignee">;
```

`Omit` is a utility type, that can be used to create a new type by removing some attributes.

Next, we need to update the `src/reducers/tasks.tsx` to include the actions for creating task.

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
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string };

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
    case TaskListAvailableAction.REORDER_TASKS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
```

Next, we will add a `addTask` function to the `TaskContextType`. Open `TaskContext.tsx` file and update `TaskContextType`

```tsx
interface TaskContextType {
  taskListState: TaskListState;
  reorderTasks: (data: ProjectData) => void;
  addTask: (task: TaskDetailsPayload) => void;
  refreshTasks: () => void;
  deleteTask: (task: TaskDetails) => void;
}

export const TaskActionsContext = createContext<TaskContextType>({
  taskListState: initialState,
  reorderTasks: (data: ProjectData) => {},
  refreshTasks: () => {},
  deleteTask: (task) => {},
  addTask: (taskPayload) => {},
});
```

Next, We will move the API call to create a task to `TaskContext.tsx` file. To refresh the task list after a new one is created, we will invoke `refreshTasks` function.

```tsx
const addTask = useCallback(
  async (task: TaskDetailsPayload) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: TaskListAvailableAction.CREATE_TASK_REQUEST });
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
      dispatch({ type: TaskListAvailableAction.CREATE_TASK_SUCCESS });
      refreshTasks();
    } catch (error) {
      console.error("Operation failed:", error);
      dispatch({
        type: TaskListAvailableAction.CREATE_TASK_FAILURE,
        payload: "Unable to create task",
      });
    }
  },
  [refreshTasks, projectID]
);
```

Open `NewTask.tsx`. And import the `TaskActionsContext` to it.

```tsx
import { TaskActionsContext } from "../../../contexts/TaskContext";
```

Extract the `addTask` from the context.

```tsx
const { addTask } = useContext(TaskActionsContext);
```

Invoke the `addTask` when the form is submitted.

```tsx
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    addTask({ title, description, dueDate });
    closeModal();
  } catch (error) {
    console.error("Operation failed:", error);
  }
};
```

Let's save the changes. Now, creating a task also trigger a fetching of the list and newly created tasks get populated.

See you in the next lesson.
