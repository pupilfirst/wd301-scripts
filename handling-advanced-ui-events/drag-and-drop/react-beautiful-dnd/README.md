# Text

> Visit [react-beautiful-dnd npm package](https://www.npmjs.com/package/react-beautiful-dnd)

`react-beautiful-dnd` is a package maintained by Atlassian. It can be used to add drag and drop feature to our application.

Let's add it to our project. Open `wd301` in VS Code. From the integrated terminal, change into `smarter-tasks` project.

```sh
cd smarter-tasks
```

Now add the packge using `npm`.

```sh
npm install react-beautiful-dnd --save
```

To get intellisense for TypeScript, we will also install the type definitions for this package.

```sh
npm install @types/react-beautiful-dnd --save-dev
```

Now, we will render the tasks in different columns based on their state.

Let's create a file `src/pages/project_details/DragDropList.tsx`

We will create `DragDropList` component, and each list be wrapped in a `Container` component. We do it in such a way to make any future customizations simple. We will import `ProjectData` type and a `Column` component, which we will create shortly, in `DragDropList.tsx`.

```tsx
import React from "react";
import { ProjectData } from "../../context/tasks/types";
import Column from "./Column";

const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};
```

`PropsWithChildren` is a type which will include `children` attribute. Otherwise, TypeScript compiler will give warning when we try to access `props.children`.

We will then create the `DragDropList` component. It will accept the project details as it's prop.

We will map over `column` ID from the `columnOrder` and then render the tasks in a `Column` component.

```tsx
const DragDropList = (props: { data: ProjectData }) => {
  return (
    <Container>
      {props.data.columnOrder.map((colID) => {
        const column = props.data.columns[colID];
        const tasks = column.taskIDs.map((taskID) => props.data.tasks[taskID]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </Container>
  );
};

export default DragDropList;
```

Let's create the `Column` component. Create a file named `Column.tsx`.

```tsx
import React from "react";

import { ColumnData, TaskDetails } from "../../context/tasks/types";

const Container = (props: React.PropsWithChildren) => {
  // We will use flex to display lists as columns
  return (
    <div className="m-2 border border-gray rounded w-1/3 flex flex-col">
      {props.children}
    </div>
  );
};

// A component to render the title, which will be included as <Title>This is a sample title</Title>
const Title = (props: React.PropsWithChildren) => {
  return <h3 className="p-2 font-semibold">{props.children}</h3>;
};

const TaskList = (props: React.PropsWithChildren) => {
  return <div className="grow min-h-100"> {props.children}</div>;
};

interface Props {
  column: ColumnData;
  tasks: TaskDetails[];
}

const Column: React.FC<Props> = (props) => {
  // Render each `Task` within a `TaskList` component.
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TaskList>
        {props.tasks.map((task) => (
          <Task key={task.id} task={task}  />
        ))}
      </TaskList>
    </Container>
  );
};

export default Column;
```

We will reuse the `Task` component from earlier levels. But we will modify the component a include a container. So if you can access to the source code of previous level, then you can copy `Task.tsx`, `TaskCard.css` and paste it in the `/src/pages/project_details` folder, or you can just create those files.

Now, open `Task.tsx` and split it into a container and child component. We will also add a `Link` to navigate to task detail page, when the user clicks on it. We will remove the code to delete a task for the time being.

```tsx
// /src/pages/project_details/Task.tsx

import React from "react";
import { Link } from "react-router-dom";

import { TaskDetails } from "../../context/tasks/types";
import "./TaskCard.css";

const Task: React.FC<React.PropsWithChildren<{ task: TaskDetails }>> = (
  props
) => {
  const { task } = props;
  return (
    <div className="m-2 flex">
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

const Container = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
  }>
) => {
  return <Task task={props.task} />;
};

export default Container;
```

The `TaskCard.css` file (`/src/pages/project_details/TaskCard.css`) would have the following content:
```css
.TaskItem {
  border: 1px solid #DFDFDF;
  border-radius: 4px;
  padding: 6px 8px;
  margin-bottom: 6px;
}
```

Now, let's import `Task` component in `Column.tsx` file.

```tsx
import Task from "./Task";
```


Next, we will use the context to get the list of tasks in our component.
Switch to `src/pages/project_details/ProjectDetails.tsx` file and use the context to retrieve the task list. Let's import the `useTasksState` first. We will also import the `DragDropList` component to render the tasks.

```tsx
import { useTasksState } from "../../context/tasks/context";
```

Now, we can extract required data from the context.

```tsx
const tasksState = useTasksState();
```

We will show a loading component if the tasks are being fetched.

```tsx
if (tasksState.isLoading) {
  return <>Loading...</>;
}
```

And finally, we will render the `DragDropList` component and pass the `tasksState.projectData` as the prop. We will also have to import the `DragDropList` component.

```tsx
import DragDropList from "./DragDropList";

// ...

<div className="grid grid-cols-1 gap-2">
  <DragDropList data={tasksState.projectData} />
</div>
```

So the `ProjectDetails` component looks like:

```tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useTasksState } from "../../context/task/context";
import DragDropList from "./DragDropList";
import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
  // Extract task and project from context
  const tasksState = useTasksState();
  const projectState = useProjectsState();

  // Get the selected project based on `projectID`
  const selectedProject = projectState?.activeProject;

  // Display error if there is no project with given id.
  if (!selectedProject) {
    return <>No such Project!</>;
  }

  if (tasksState.isLoading) {
    return <>Loading...</>;
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
      <div className="grid grid-cols-1 gap-2">
        <DragDropList data={tasksState.projectData} />
      </div>
    </>
  );
};

export default ProjectDetails;
```

Now save the file. We can see the tasks as being rendered as lists. You can add some dummy data in `initialData.ts` and refresh the page to see them populating correctly in the columns.

> `react-beautiful-dnd` doesn't work in react `strict` mode. So you need to make sure the `App` component is **not** rendered within `<React.StrictMode>` in `main.tsx`

```tsx
// This won't work
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

See you in the next lesson.
