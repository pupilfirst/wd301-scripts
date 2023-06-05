# Text

> Visit [react-beautiful-dnd npm package](https://www.npmjs.com/package/react-beautiful-dnd)

`react-beautiful-dnd` is a package maintained by Atlassian. It can be used to add drag and drop feature to our application.

Let's add it to our project. Open `wd301` in VS Code. From the integrated terminal, change into `smarter-tasks` project.

```sh
cd smarter-tasks
```

Now add the packge using `npm`.

```sh
npm install react-beautiful-dnd
```

To get intellisense for TypeScript, we will also install the type definitions for this package.

```sh
npm install @types/react-beautiful-dnd --save-dev
```

Now, we will render the tasks in different coloumns based on their state.

Let's create a file `src/pages/project_details/DragDropList.tsx`

We will create `DragDropList` component, and each list be wrapped in a `Container` component. We do it in such a way to make any future customizations simple.

```tsx
import React from "react";

const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};
```

`PropsWithChildren` is a type which will include `children` attribute.

We will then create the `DragDropList` component. It will accept the project details and a function `reorderTasks` as it's props.

We will map over `coloumn` ID from the `coloumnOrder` and then render the tasks in a `Coloumn` component.

```tsx
const DragDropList = (props: {
  data: ProjectData;
  reorderTasks: (data: ProjectData) => void;
}) => {
  return (
    <Container>
      {props.data.coloumnOrder.map((colID) => {
        const coloumn = props.data.coloumns[colID];
        const tasks = coloumn.taskIDs.map((taskID) => props.data.tasks[taskID]);
        return <Coloumn key={coloumn.id} coloumn={coloumn} tasks={tasks} />;
      })}
    </Container>
  );
};

export default DragDropList;
```

Let's create the `Coloumn` component. Create a file named `Coloumn.tsx`.

```tsx
import React from "react";

import { ColoumnData, TaskDetails } from "../../reducers/types";

const Container = (props: React.PropsWithChildren) => {
  return (
    <div className="m-2 border border-gray rounded w-1/3 flex-col">
      {props.children}
    </div>
  );
};

const Title = (props: React.PropsWithChildren) => {
  return <h3 className="p-2 font-semibold">{props.children}</h3>;
};

const TaskList = (props: React.PropsWithChildren) => {
  return <div className="grow min-h-100 dropArea"> {props.children}</div>;
};

interface Props {
  coloumn: ColoumnData;
  tasks: TaskDetails[];
}

const Coloumn: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>{props.coloumn.title}</Title>
      <TaskList>
        {props.tasks.map((task, idx) => (
          <Task key={task.id} task={task} index={idx} />
        ))}
      </TaskList>
    </Container>
  );
};

export default Coloumn;
```

We will reuse the `Task` component from earlier levels. But we will modify the component a include a container.
Copy `Task.tsx`, `TaskCard.css` into `src/pages/project_details` folder from `thrash` folder.

Let's import `Task` component in `Coloumn.tsx` file.

```tsx
import Task from "./Task";
```

Now, open `Task.tsx` and split it into a container and child component. We will also add a `Link` to navigate to task detail page, when the user clicks on it. We will remove the code to delete a task for the time being. We will also include an `index` s prop for the `Task` component.

```tsx
import React from "react";

import { TaskDetails } from "../../reducers/types";
import "./TaskCard.css";
import { Link } from "react-router-dom";

const Container: React.FC<React.PropsWithChildren<{ task: TaskDetails }>> = (
  props
) => {
  const { task } = props;
  return (
    <div {...props} className="m-2 flex">
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
            onClick={(event) => {}}
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
};

const Task = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
    index: number;
  }>
) => {
  return <Container task={props.task} />;
};

export default Task;
```

Next, we have to create a context that can be used to provide the list of tasks, when a project detail page is visited.

Create a file named `TaskContext.tsx` in `src/contexts` with following content.

```tsx
import React, { createContext, useReducer } from "react";
import { ProjectData, TaskListState } from "../reducers/types";
import {
  initialState,
  taskReducer,
  TaskActions,
  TaskListAvailableAction,
} from "../reducers/tasks";

interface TaskContextType {
  taskListState: TaskListState;
  reorderTasks: (data: ProjectData) => void;
}

export const TaskActionsContext = createContext<TaskContextType>({
  taskListState: initialState,
  reorderTasks: (data: ProjectData) => {},
});

export const TaskActionProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<
    React.Reducer<TaskListState, TaskActions>
  >(taskReducer, initialState);
  const reorderTasks = (data: ProjectData) => {
    dispatch({
      type: TaskListAvailableAction.REORDER_TASKS,
      payload: data,
    });
  };

  return (
    <TaskActionsContext.Provider
      value={{
        taskListState: state,
        reorderTasks,
      }}
    >
      {children}
    </TaskActionsContext.Provider>
  );
};
```

Next, we will use this context to pass the list of tasks to the `ProjectDetail` component.

Open `index.tsx` file from `src/pages/project_details` folder in VS Code and import the newly created context in it.

```tsx
import { TaskActionProvider } from "../../contexts/TaskContext";
```

Wrap the `ProjectDetails` component with this context.

```tsx
const ProjectDetailsIndex: React.FC = () => {
  return (
    <ProjectProvider>
      <TaskActionProvider>
        <ProjectDetails />
        <Outlet />
      </TaskActionProvider>
    </ProjectProvider>
  );
};
```

Switch to `src/pages/project_details/ProjectDetails.tsx` file and use the context to retrieve the task list. Let's import the `TaskActionsContext` first. We will also import the `DragDropList` component to render the tasks.

```tsx
import { TaskActionsContext } from "../../contexts/TaskContext";
import DragDropList from "./DragDropList";
```

Now, we can extract required data from the context.

```tsx
const { reorderTasks, taskListState } = useContext(TaskActionsContext);
```

We will show a loading component if the tasks are being fetched.

```tsx
if (taskListState.isLoading) {
  return <>Loading...</>;
}
```

And finally, we will render the `DragDropList` component and pass the `projectData`, `reorderTasks` as the props.

```tsx
<div className="grid grid-cols-1 gap-2">
  <DragDropList data={taskListState.projectData} reorderTasks={reorderTasks} />
</div>
```

So the `ProjectDetails` component looks like:

```tsx
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { TaskActionsContext } from "../../contexts/TaskContext";
import DragDropList from "./DragDropList";
const ProjectDetails = () => {
  const { projects } = useContext(ProjectContext);
  const { reorderTasks, taskListState } = useContext(TaskActionsContext);

  let { projectID } = useParams();
  const selectedProject = projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];
  if (!selectedProject) {
    return <>No such Project!</>;
  }
  if (taskListState.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject?.name}
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
      <div className="grid grid-cols-1 gap-2">
        <DragDropList
          data={taskListState.projectData}
          reorderTasks={reorderTasks}
        />
      </div>
    </>
  );
};
export default ProjectDetails;
```

Now save the file. We can see the tasks as being rendered as lists. You can add some dummy data in `initialData.ts` and refresh the page to see them populating correctly in the coloumns.

See you in the next lesson.
