# Text

In this lesson, we will replace static task data with the list of tasks retrieved from API server.

Open `TaskContext.tsx` in VS Code.

Let's add capability to fetch tasks to the context. We will add `refreshTasks` method to the `TaskContextType`.

```tsx
interface TaskContextType {
  taskListState: TaskListState;
  reorderTasks: (data: ProjectData) => void;
  refreshTasks: () => void;
}

export const TaskActionsContext = createContext<TaskContextType>({
  taskListState: initialState,
  reorderTasks: (data: ProjectData) => {},
  refreshTasks: () => {},
});
```

Let's retrieve the `projectID` from route using `useParams` hook. Let's import it from `react-router-dom` package.

```tsx
export const TaskActionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<
    React.Reducer<TaskListState, TaskActions>
  >(taskReducer, initialState);
  let { projectID } = useParams();

  // ...
};
```

Switch to `src/reducers/task.tsx`. We will add actions to the enum.

- FETCH_TASKS_REQUEST
- FETCH_TASKS_SUCCESS
- FETCH_TASKS_FAILURE

```tsx
export enum TaskListAvailableAction {
  FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}
```

We will also update `TaskActions` to reflect the newly availble actions.

```tsx
export type TaskActions =
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_REQUEST }
  | { type: TaskListAvailableAction.FETCH_TASKS_SUCCESS; payload: ProjectData }
  | { type: TaskListAvailableAction.FETCH_TASKS_FAILURE; payload: string };
```

We will also update the reducer to update the state:

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
    case TaskListAvailableAction.REORDER_TASKS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
```

Switch back to `TaskContext.tsx`
Import the API endpoint from `constants.ts`

```tsx
import { API_ENDPOINT } from "../config/constants";
```

We will now create a function called `refreshTasks` which will trigger a request to API server and fetches the task list for a given `projectID`.

```tsx
const refreshTasks = useCallback(async () => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.FETCH_TASKS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_SUCCESS,
      payload: data,
    });
    console.dir(data);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_FAILURE,
      payload: "Unable to load tasks",
    });
  }
}, [projectID]);
```

We here make use of `useCallback` hook, which caches the function definition based on dependency array. Otherwise, the function will get recreated on each re-render.

Now, we will trigger this `fetchTasks` when the component gets mounted using `useEffect` hook. We will also have to import `useEffect` from `react`.

```tsx
useEffect(() => {
  refreshTasks();
}, [refreshTasks]);
```

Add the `refreshTasks` function to the context.

```tsx
<TaskActionsContext.Provider
  value={{
    taskListState: state,
    reorderTasks,
    refreshTasks,
  }}
>
  {children}
</TaskActionsContext.Provider>
```

Save the file. Now, the tasks for a project will get listed properly. And they can be moved around the lists as well.
