In this lesson, we will learn more about what path parameters (params) are and how to use them in React Router within our application.

Path params are dynamic parts of a URL that can be used to pass data to a component in React Router. They are defined in the route path like this:

```tsx
const router = createBrowserRouter([
  {
    path: "/tasks/:id",
    element: <TaskDetails />,
  },
]);
```

In this example, `:id` is the path param, which can be any string value. When the user navigates to a URL that matches this route, React Router will extract the value of the `id` parameter from the URL and pass it as a prop to the TaskDetails component.

For example, if the user navigates to `/tasks/123``, React Router will pass the value "123" as a prop to the TaskDetails component.

To use path params in our project, we will modify the routes in our `App.tsx` file.

```tsx
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "tasks",
        element: <TaskListPage />,
      },
      {
        path: "tasks/:id",
        element: <TaskDetailsPage />,
      },
    ],
  },
]);
```

So, next, we will create a `TaskDetailsPage` component in the `pages/TaskDetailsPage.tsx` file:

```tsx
import React from "react";

const TaskDetailsPage: React.FC = () => {
  return (
    <div>
      <h1>Task Details page</h1>
    </div>
  );
};

export default TaskDetailsPage;
```

Once it's complete, we can import this file in `App.tsx`.

```tsx
// ...
import TaskDetailsPage from "./pages/TaskDetailsPage";
// ...
// ...
```

Now let's go back to the browser to check if this new route is working or not.

> Action: Open http://localhost:5173/tasks/123

So, as you can see, the content from the `TaskDetailsPage` component, is showing up here properly. That's great.

Next, we will update the `TaskDetailsPage` component, and try to access the ID which is coming as part of the path parameter.

```tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TaskItem } from "../types";

interface TaskDetailsPageParams extends Record<string, string> {
  id: string;
}

interface TaskAppState {
  tasks: TaskItem[];
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<TaskDetailsPageParams>();
  const [taskAppState] = useLocalStorage<TaskAppState>("tasks", {
    tasks: [],
  });

  const task = taskAppState.tasks.find((task) => task.id === id);

  return (
    <div className="bg-white shadow-md rounded-md p-4 m-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{task?.title}</h3>
      </div>
      <p className="text-gray-600">{task?.description}</p>
      <p className="text-gray-600">{task?.dueDate}</p>
    </div>
  );
};

export default TaskDetailsPage;
```

Note that we're using the `useParams` hook from the `react-router-dom` package to access the `id` parameter from the URL.

Now, when the user navigates to a URL like `/tasks/123`, React Router will pass the value "123" as the id prop to the `TaskDetailsPage` component.

Finally, let's modify the `TaskListPage` component in the `pages/TaskListPage.tsx` to import and use our existing TaskApp component:

```tsx
import React from "react";
import TaskApp from "../TaskApp";
const TaskListPage: React.FC = () => {
  return (
    <div>
      <TaskApp />
    </div>
  );
};

export default TaskListPage;
```

Next, we will update the Task component, to include links to the task details page for each and every task. Update the `Task.tsx` component as below:

```tsx
import "./TaskCard.css";
import { TaskItem } from "./types";

interface TaskProps {
  item: TaskItem;
  removeTask: (task: TaskItem) => void;
}
const Task = (props: TaskProps) => {
  const { item, removeTask } = props;
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
          <a href={`/tasks/${item.id || ""}`}>
            <h2 className="text-base font-bold my-1">{item.title}</h2>
          </a>
          <p className="text-sm text-slate-500">{item.dueDate}</p>
          <p className="text-sm text-slate-500">
            Description: {item.description}
          </p>
        </div>

        <button
          className="deleteTaskButton cursor-pointer flex items-center justify-center h-4 w-4 rounded-full my-5 mr-5"
          onClick={() => removeTask(item)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
```

Now let's go back to the browser to check if this new route is working or not.

> Action: Open http://localhost:5173/tasks
> Add a new task
> Click the link available on new task, it will take you to task details page.

Now, when the user clicks on a task title link, React Router will navigate to the task details page with the task ID as a path param. And, when the user navigates to a URL that includes a task ID, React Router will pass the task ID as a prop to the TaskDetails component, allowing you to display the details for a specific task.

Path params provide a level of customization that helps you transfer data from one route to another with a lot of control. Let us learn more about other features of React router in the next lesson.

See you at the next one!
