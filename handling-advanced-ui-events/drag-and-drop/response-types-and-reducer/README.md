# Text

In this lesson, we will create TypeScript types to model the API response.

Let's take a look at the API response for listing a task.

> Visit [List task API](https://wd301-api.pupilfirst.school/#/Tasks/get_projects__projectId__tasks)

We can see the response is of the following shape.

```json
{
  "columns": {
    "pending": {
      "id": "pending",
      "title": "Pending",
      "taskIDs": ["2"]
    },
    "in_progress": {
      "id": "in_progress",
      "title": "In progress",
      "taskIDs": ["1"]
    },
    "done": {
      "id": "done",
      "title": "Done",
      "taskIDs": []
    }
  },
  "tasks": {
    "1": {
      "id": 1,
      "title": "Sample Task",
      "description": "Sample description about the task which is to be completed",
      "dueDate": "",
      "state": "in_progress",
      "assignee": null,
      "assignedUserName": null
    },
    "2": {
      "id": 2,
      "title": "Another Sample Task",
      "description": "Sample description about the task which is to be completed",
      "dueDate": "",
      "state": "pending",
      "assignee": null,
      "assignedUserName": null
    }
  },
  "columnOrder": ["pending", "in_progress", "done"]
}
```

We have three columns ie, `pending`, `in_progress`, and `done`. We have `columnOrder`, which can be used to control in what order the lists must be rendered. Then we have the tasks which can be accessed using their `id`.

Now, let's create types to model this shape.

We will use a `union` type to model the coloumns.

Open `src/context/task/types.ts` file in VS Code and add the following entry to it.

```ts
export type AvailableColoumns = "pending" | "in_progress" | "done";
```

Each entry in a coloumn ie,

```json
{
  "id": "pending",
  "title": "Pending",
  "taskIDs": ["2"]
}
```

can be modelled as follows.

```ts
export type ColoumnData = {
  id: string;
  title: string;
  taskIDs: string[];
};
```

Then the whole `coloumn` key in the response can be modelled as:

```ts
export type Coloumns = {
  [k in AvailableColoumns]: ColoumnData;
};
```

Task details can be modelled as:

```ts
export type TaskDetails = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  state: AvailableColoumns;
  assignee?: number,
  assignedUserName?: string
};
```

We can rewrite the `TaskDetailsPayload` to re use the `TaskDetails` type. TypeScript provides a utility type called `Omit`, which helps in creating a new type by list of attributes of already existing type. We just need to discard `id` `assignee`, `state` from `TaskDetails` type.

```tsx
export type TaskDetailsPayload = Omit<TaskDetails, "id" | "assignee" | "state">;
```

Tasks in the response can then be modelled as

```ts
export type Tasks = {
  [k: string]: TaskDetails;
};
```

Finally, the entire API response can be modelled as:

```ts
export type ProjectData = {
  tasks: Tasks;
  coloumns: Coloumns;
  coloumnOrder: AvailableColoumns[];
};
```

We will use `useReducer` hook to manage the state. So, we already have defined `TaskListState` as the state's type. In the state, we have the API response, then some flags whether the data is currently loading or has errored etc. We will also add the `ProjectData` type to it.

```ts
export interface TaskListState {
  projectData: ProjectData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
```

You can also use a `type` here instead of an `interface`.

At first, we will work with static data and make sure our drag and drop works. Let's create a file `initialData.ts` in `src/context/task` folder with following content.

```ts
import { ProjectData } from "./types";

const initialData: ProjectData = {
  coloumns: {
    pending: {
      id: "pending",
      title: "Pending",
      taskIDs: ["2"],
    },
    in_progress: {
      id: "in_progress",
      title: "In progress",
      taskIDs: ["1"],
    },
    done: {
      id: "done",
      title: "Done",
      taskIDs: [],
    },
  },
  tasks: {
    "1": {
      id: 1,
      title: "Sample Task",
      description: "Sample description about the task which is to be completed",
      dueDate: "",
      state: "in_progress",
      assignee: undefined,
      assignedUserName: undefined
    },
    "2": {
      id: 2,
      title: "Another Sample Task",
      description: "Sample description about the task which is to be completed",
      dueDate: "",
      state: "pending",
      assignee: undefined,
      assignedUserName: undefined
    },
  },
  coloumnOrder: ["pending", "in_progress", "done"],
};

export default initialData;
```

Now, we will use this initial state in our `taskReducer`. Let's open `src/context/task/reducer.ts` and update the initial state.

```tsx
import { Reducer } from "react";

import projectData from "./initialData";
import { ProjectData, TaskDetails, TaskListState } from "./types";

// Define the initial state
export const initialState: TaskListState = {
  projectData: projectData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};
```

We have now defined an initial state. Next, we need to update the actions available and the reducer itself.

Switch to `types.ts` and add an entry `REORDER_TASKS`

We use an `enum` to model the available actions, so that we don't deal with any [magic strings](https://deviq.com/antipatterns/magic-strings)

```ts
export enum TaskListAvailableAction {
  CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}

// Define the action types and payload
export type TaskActions =
  | { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string }
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectData };
```

We will add the action `REORDER_TASKS`, which will have a payload of type `ProjectData` with updated orderings of tasks.

Next we will update the reducer itself.

```tsx
export const taskReducer: Reducer<TaskListState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
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

We will update the state with new ordering whenever `REORDER_TASKS` action is dispatched.

To actually invoke it, we need to add a `reorderTasks` function in `action.ts`. Let's open `src/context/task/action.ts` and add it.

```tsx
export const reorderTask = (dispatch: TasksDispatch, newState: ProjectData)  => {
  dispatch({type: TaskListAvailableAction.REORDER_TASKS, payload: newState})
}
```

See you in the next lesson.
