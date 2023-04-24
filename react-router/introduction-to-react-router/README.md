# Text

It this level, we'll learn what React Router is, how to integrate it into your project and how to use it to create application routes for your React app.

React Router is a library that allows us to handle routing in a React application. It provides a declarative way to define routes and map them to different components in our application. This means we can create a navigation system that works with URLs, allowing our users to easily navigate between pages or views of our app.

First, let us start by installing and adding the React Router to our application.

In the terminal, within your `smarter-tasks` project folder, type the following command:

```bash
npm install --save react-router-dom@latest @types/react-router-dom
```

This will install the necessary packages we need to use React Router.

Next, let us learn how to work with React Router.

Let's try and integrate routes into our existing task management application. Let us split the application to have a home page, task list page, and task details page. 

First, we'll need to import the necessary components from the React Router package. Open up the 'index.tsx' file in our project and add the following import at the top:

```js
import { BrowserRouter } from "react-router-dom";
```

Also, lets update the `root.render` function to use the above `BrowserRouter` instead of the `React.StrictMode` like below.

```js
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

We're using the 'BrowserRouter' component, which allows us to use regular URLs like '/tasks' or '/tasks/:id'. 

Next, let's update our 'App' component to use the 'Router' component. Open up the 'App.tsx' file in our project and add the following import at the top:

```js
import { Routes, Route } from "react-router-dom";
```

Now lets update the `App` component with the routes we will plan to use in our application. Update the return for the `App` function with the below code.

```js
function App() {
  return (
    <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/tasks" element={ <TaskApp/> } />
        <Route path="/tasks/:id" element={ <TaskDetailsPage/> } />
      </Routes>
  );
}
```

Here we're using the 'Route' component to map URLs to different components. 

Now let's create the components for our home page, task list page, and task details page.
Create `HomePage.tsx` file under the `/src` folder in our `smarter-task` project and copy the lines below.

```js
// HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <p>Welcome to the Task Manager application!</p>
    </div>
  );
};

export default HomePage;
```

For listing the tasks we will use the already created `TaskApp` component as we mentioned in the `App` component. 

Next, Lets create `TaskDetailsPage.tsx` file under the `/src` folder in our `smarter-task` project and copy the lines below.

```js
// TaskDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface TaskDetailsPageParams extends Record<string, string> {
  id: string;
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<TaskDetailsPageParams>();
  return (
    <div>
      <h1>Task Details</h1>
      <p>This is the Task Details page for task with ID: {id}</p>
    </div>
  );
};

export default TaskDetailsPage;
```

Here, we're using the 'useParams' hook from React Router to extract the ID parameter from the URL. 

Now that we've created our components and added the necessary routes to our 'App' component, let's the working routes in our app. Run the following command in your terminal to start the development server:

```bash
npm start
```

Now, if you go to 'http://localhost:3000/', you should see the home page. If you navigate to 'http://localhost:3000/tasks', you should see the task list page. And if you navigate to 'http://localhost:3000/tasks/1' (or any other ID value), you should see the task details page with the ID displayed.

We will learn more about using the React Router to configure our application and how to use it to programmatically navigate between different pieces of the application in the upcoming lessons.

See you in the next one!

