# Text

In this lesson, we will create TypeScript types to model the API response.

Let's take a look at the API response for listing a task.

> Visit [List task API](https://wd301-api.pupilfirst.school/#/Tasks/get_projects__projectId__tasks)

We can see the reponse is of the following shape.

```json
{
  "coloumns": {
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
      "id": "1",
      "title": "Sample Task",
      "description": "Sample description about the task which is to be completed",
      "dueDate": "",
      "state": "in_progress"
    },
    "2": {
      "id": "2",
      "title": "Another Sample Task",
      "description": "Sample description about the task which is to be completed",
      "dueDate": "",
      "state": "pending"
    }
  },
  "coloumnOrder": ["pending", "in_progress", "done"]
}
```

We have three coloumns ie, `pending`, `in_progress`, and `done`. We have `coloumnOrder`, which can be used to control in what order the lists must be rendered. Then we have the tasks which can be accessed using their `id`.

Now, let's create types to model this shape.

We will use a `union` type to model the coloumns.

Open `src/reducers/types.ts` file in VS Code and add the following entry to it.

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
};
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

We will use `useReducer` hook to manage the state. So, we need to add another type for it. In this state, we will have the API response, then some flags whether the data is currently loading or has errored etc.

```ts
export interface TaskListState {
  projectData: ProjectData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
```

You can also use a `type` here instead of an `interface`.

At first, we will work with static data and make sure our drag and drop works. Let's create a file `initialData.ts` in `src/reducers` with following content.

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
      id: "1",
      title: "Sample Task",
      description: "Sample description about the task which is to be completed",
      dueDate: "",
      state: "in_progress",
    },
    "2": {
      id: "2",
      title: "Another Sample Task",
      description: "Sample description about the task which is to be completed",
      dueDate: "",
      state: "pending",
    },
  },
  coloumnOrder: ["pending", "in_progress", "done"],
};

export default initialData;
```

Now, we will create a `reducer` that will be used to manage the state. Create a file named `tasks.tsx` in `src/reducers` with following content.

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

We have now defined an initial state. Next, we need to define the actions available and the reducer itself.

We will use an `enum` to model the available actions, so that we don't deal with any [magic strings](https://deviq.com/antipatterns/magic-strings)

```ts
export enum TaskListAvailableAction {
  REORDER_TASKS = "REORDER_TASKS",
}

// Define the action types and payload
export type TaskActions = {
  type: TaskListAvailableAction.REORDER_TASKS;
  payload: ProjectData;
};
```

For now, we will only have a single action `REORDER_TASKS`, which will have a payload of type `ProjectData` with updated orderings of tasks.

Next we will define the reducer itself.

```tsx
export const taskReducer: Reducer<TaskListState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TaskListAvailableAction.REORDER_TASKS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
```

We will update the state with new ordering whenever `REORDER_TASKS` action is dispatched.

See you in the next lesson.
