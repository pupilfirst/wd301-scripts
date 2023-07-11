# Text

In this lesson, we will learn more about what path params are and how to use them in React Router within our application.

Path params are dynamic parts of a URL that can be used to pass data to a component in React Router. They are defined in the route path as a parameter surrounded by curly braces, like this:

```js
<Route path="/users/:id" component={UserDetails} />
```

In this example, `:id` is the path param, which can be any string value. When the user navigates to a URL that matches this route, React Router will extract the value of the id parameter from the URL and pass it as a prop to the UserDetails component.

For example, if the user navigates to /users/123, React Router will pass the value "123" as a prop to the UserDetails component.

To add path params to the existing project, we will modify the routes in our `App.tsx` file.

Let's start by adding link from the `Task.tsx` page to share the task id to the TaskDetailsPage, so that we can display the details for a specific task.

First, let's modify the Task component in `Task.tsx` to share a `id` prop:

Add a Link tag to the `h2` element as below so the user can click on the Task title to navigate to the task details page.

```js
<Link to={`/tasks/${item.id}`}>
  <h2 className="text-base font-bold my-1">{item.title}</h2>
</Link>
```

Next, let's modify the TaskDetails component in `TaskDetailsPage.tsx` to accept a `id` prop:

```js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskItem } from "./types";

interface TaskDetailsPageParams extends Record<string, string> {
  id: string;
}

interface TaskAppState {
  tasks: TaskItem[];
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<TaskDetailsPageParams>();
  const [taskAppState] = useLocalStorage<TaskAppState>(
    "tasks",
    {
      tasks: [],
    }
  );
  
  const task = taskAppState.tasks.find(task => task.id === id);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
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

In the above code, we have read the latest list of tasks from the Localstorage, filtered out the task details by `id` param and displayed the same. 

Note that we're using the useParams hook from the react-router-dom package to access the `id` parameter from the URL. We're also passing the `id` prop to the component, which we'll use to display the task details.

Next, let's verify the route for the TaskDetails component in the `App.tsx` file to confirm if it includes a id path param:

```js
<Route path="/tasks/:id" element={ <TaskDetailsPage/> } />
```

Now, when the user navigates to a URL like `/tasks/123`, React Router will pass the value "123" as the `id` prop to the TaskDetails component.

Now, when the user clicks on a task link, React Router will navigate to the task details page with the task ID as a path param. And, when the user navigates to a URL that includes a task ID, React Router will pass the task ID as a prop to the TaskDetails component, allowing you to display the details for a specific task.

Path params provide a level of customization that helps you transfer data from one route to another with a lot of control. Let us learn more about other features of React router in the next lesson.

See you at the next one!


