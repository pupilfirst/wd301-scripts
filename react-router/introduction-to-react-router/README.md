In this level, we'll learn what React Router is, how to integrate it into your project and how to use it to create application routes for your React app.

React Router is a library that allows us to handle routing in a React application. It provides a declarative way to define routes and map them to different components in our application. This means we can create a navigation system that works with URLs, allowing our users to easily navigate between pages or views of our app.

First, let us start by installing and adding the React Router to our application.

In the terminal, within your `smarter-tasks` project folder, type the following command:

```bash
npm install --save react-router-dom@latest @types/react-router-dom
```

This will install the necessary packages we need to use React Router.

Next, let us learn how to work with React Router.

Let's try and integrate routes into our existing task management application. Let us split the application to have a home page, task list page, and task details page.

First, we'll need to import the necessary components from the React Router package. Open up the `App.tsx` file in your project and add the following imports at the top:

```tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
```

**ReactRouter** provides us a custom hook named `createBrowserRouter`, which helps us to define our routes as a plain JavaScript object. So let's define the routes:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TaskListPage />,
  },
]);
```

So as you can see, the `createBrowserRouter` hooks accepts an array of objects, where each object represents a configuration of a path. Each object should have atleast two properties, `path` and `element`. Here `path` defines the actual path which our end user will enter or navigate to, and the `element` property defines, which React component we will render to show content on that path.

Next, let's update our 'App' component to use the 'router' that we've defined.

```js
const App = () => {
  return <RouterProvider router={router} />;
};
```

Here we're using the 'RouterProvider' component, which is used to provide a routing context to the nested components in our application. This component access our routes as `router` props.

Now let's create the components for our home page and task list page.

For that, first I'll create a `pages` folder inside the `src` directory, to keep all of our components related to pages.

Then we will create `HomePage.tsx` file under the `/src/pages` folder with the following code:

```js
// HomePage.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
      <p className="text-lg text-gray-600">
        Welcome to the Task Manager application!
      </p>
    </div>
  );
};
export default HomePage;
```

Next, we will create `TaskListPage.tsx` file under the `/src/pages` folder with the following code:

```js
// TaskListPage.tsx
import React from "react";
import TaskApp from "../TaskApp";
const TaskListPage: React.FC = () => {
  return (
    <div>
      <h1>This is the Task List Page</h1>
    </div>
  );
};

export default TaskListPage;
```

and finally we will import the `HomePage` and `TaskListPage` component in our `App` component.

```tsx
// App.tsx

import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
```

Now that we've created our components and imported them in our 'App' component, let's restart the app and open 'http://localhost:5173/' in browser.

> Action: Open http://localhost:5173/ in browser
> So, as you can see, the HomePage content shows up by default, and if we would navigate to http://localhost:5173/tasks, we will see the task list page.

If you deploy the current app to Netlify, and try to visit `https://your-deployed-app.netlify.com/tasks`, it will display an error. React-router handles routings on the client side. Netlify doesn’t know how to locate that route on the server side. And that’s why Netlify throws an error if you try to navigate to any other route apart from the root route. To fix the error, you will have to update the `netlify.toml` file to redirect all server side routes to `index.html`. Modify the `netlify.toml` with following content.

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

We will learn more about using the React Router to configure our application and how to use it to programmatically navigate between different pieces of the application in the upcoming lessons.

See you in the next one!
