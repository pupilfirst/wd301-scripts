# Text

In this lesson, we will learn more about what path params are and how to use them in React Router within our application.

Path params are dynamic parts of a URL that can be used to pass data to a component in React Router. They are defined in the route path as a parameter surrounded by curly braces, like this:

```js
<Route path="/users/:id" component={UserDetails} />
```

In this example, `:id` is the path param, which can be any string value. When the user navigates to a URL that matches this route, React Router will extract the value of the id parameter from the URL and pass it as a prop to the UserDetails component.

For example, if the user navigates to /users/123, React Router will pass the value "123" as a prop to the UserDetails component.

To add path params to the existing project, we will modify the routes in our `App.tsx` file.

Let's start by adding path params to the task details page so that we can display the details for a specific task.

First, let's modify the TaskDetails component in `TaskDetailsPage.tsx` to accept a `taskId` prop:

```js
import { useParams } from "react-router-dom";

interface TaskDetailsProps {
  taskId: string;
}

function TaskDetails({ taskId }: TaskDetailsProps) {
  // Use the `useParams` hook to access the `taskId` parameter from the URL
  const { id } = useParams<{ id: string }>();

  // Render the task details using the `taskId` prop and the `id` parameter from the URL
  return (
    <div>
      <h1>Task Details</h1>
      <p>Task ID: {taskId}</p>
      <p>Parameter ID: {id}</p>
      {/* Render the rest of the task details */}
    </div>
  );
}

export default TaskDetails;
```

Note that we're using the useParams hook from the react-router-dom package to access the `taskId` parameter from the URL. We're also passing the taskId prop to the component, which we'll use to display the task details.

Next, let's modify the route for the TaskDetails component in the `App.tsx` file to include a taskId path param:

```js
<Route path="/tasks/:taskId" component={TaskDetails} />
```

Now, when the user navigates to a URL like /tasks/123, React Router will pass the value "123" as the taskId prop to the TaskDetails component.

Finally, let's modify the TaskList component in the `TaskListPage.tsx` to include links to the task details page that include the task ID as a path param:

```js
import { Link } from "react-router-dom";

interface Task {
  id: string;
  name: string;
}

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
```

Now, when the user clicks on a task link, React Router will navigate to the task details page with the task ID as a path param. And, when the user navigates to a URL that includes a task ID, React Router will pass the task ID as a prop to the TaskDetails component, allowing you to display the details for a specific task.

Path params provide a level of customization that helps you transfer data from one route to another with a lot of control. Let us learn more about other features of React router in the next lesson.

See you at the next one!


