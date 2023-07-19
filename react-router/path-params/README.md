# Text

In this lesson, we will learn more about what path params are and how to use them in React Router within our application.

Path params are dynamic parts of a URL that can be used to pass data to a component in React Router. They are defined in the route path like this:

```tsx
const router = createBrowserRouter([
  {
    path: "/tasks/:id",
    element: <TaskDetails />
  },
]);
```

In this example, `:id` is the path param, which can be any string value. When the user navigates to a URL that matches this route, React Router will extract the value of the `id` parameter from the URL and pass it as a prop to the TaskDetails component.

For example, if the user navigates to /tasks/123, React Router will pass the value "123" as a prop to the TaskDetails component.

To use path params in our project, we will modify the routes in our `App.tsx` file.
```tsx
const router = createBrowserRouter([
  {
    element: (
      <Layout />
    ),
    children: [
      {
        path: "/",
        element: (<HomePage />)
      },
      {
        path: "tasks",
        element: (<TaskListPage />)
      },
      {
        path: "tasks/:id",
        element: (<TaskDetailsPage />)
      },
    ]
  }
]);
```

So, next we will create a `TaskDetailsPage` component in the `pages/TaskDetailsPage.tsx` file:
```tsx
import React from 'react';

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
So, as you can see, the content from `TaskDetailsPage` component, is showing up here properly. That's great.

Next, we will update the `TaskDetailsPage` component, and try to access the ID which is coming as part of path parameter.
```tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface TaskDetailsPageParams {
  id: string;
}

const TaskDetailsPage: React.FC = () => {
  // Use the `useParams` hook to access the `id` parameter from the URL
  const { id } = useParams<TaskDetailsPageParams>();

  // Render the task details using the `id` parameter from the URL
  return (
    <div>
      <h1>Task Details</h1>
      <p>This is the Task Details page for task with ID: {id}</p>
    </div>
  );
};

export default TaskDetailsPage;
```

Note that we're using the `useParams` hook from the `react-router-dom` package to access the `id` parameter from the URL.


Now, when the user navigates to a URL like `/tasks/123`, React Router will pass the value "123" as the id prop to the `TaskDetailsPage` component.

Finally, let's modify the `TaskListPage` component in the `pages/TaskListPage.tsx` to import and use our existing TaskApp component:
```tsx
// src/pages/TaskListPage.tsx

import React from 'react';
import TaskApp from '../TaskApp';
const TaskListPage: React.FC = () => {
  return (
    <TaskApp />
  );
};

export default TaskListPage;
```

Next, we will updated the TaskList component, to include links to the task details page for each and every task:
```tsx
// src/TaskList.tsx
import { Link } from "react-router-dom";
import Task from "./Task";
import { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
  removeTask: (task: TaskItem) => void;
}

const TaskList = (props: Props) => {
  const list = props.tasks.map((task, idx) => (
    <Link to={`/tasks/${task.id}`}>
      <Task
        key={task.id || idx}
        item={task}
        removeTask={props.removeTask}
      />
    </Link>
  ));
  return <>{list}</>;
};

export default TaskList;
```
Now let's go back to the browser to check if this new route is working or not.
> Action: Open http://localhost:5173/tasks
> Add a new task
> Click the link available on new task, it will take you to task details page.

Now, when the user clicks on a task link, React Router will navigate to the task details page with the task ID as a path param. And, when the user navigates to a URL that includes a task ID, React Router will pass the task ID as a prop to the TaskDetails component, allowing you to display the details for a specific task.

Path params provide a level of customization that helps you transfer data from one route to another with a lot of control. Let us learn more about other features of React router in the next lesson.

See you at the next one!


