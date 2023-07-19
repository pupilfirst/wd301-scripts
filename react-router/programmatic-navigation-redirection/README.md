# Text

In this lesson, we will learn about how programmatic navigation and route redirections work in React Router.

Programmatic navigation and redirections allow you to navigate to different pages in your app or redirect to a different URL programmatically, using JavaScript code instead of clicking on a link or typing in a URL in the address bar.

Let's say we want to add a sign in page to our **smarter tasks** project and redirect the user to the homepage after they've signed in successfully.

First, let's create a new `Signin` component for the sign in page:

Create `Signin.tsx` file under the `/src` folder in our `smarter-task` project and copy the lines below.

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 localStorage.setItem("authenticated", "false");

 function handleSignin(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();
   if (username === "admin" && password === "admin") {
     localStorage.setItem("authenticated", "true");
     navigate("/");
   } else {
     alert("Invalid username or password");
   }
 }

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
       <form onSubmit={handleSignin}>
         <div>
           <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
             Username
           </label>
           <input
             type="text"
             id="username"
             name="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             placeholder="Enter your username"
             className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
           />
         </div>
         <div className="mt-4">
           <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
             Password
           </label>
           <input
             type="password"
             id="password"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Enter your password"
             className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
           />
         </div>
         <div className="mt-8">
           <button
             type="submit"
             className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
           >
             Sign In
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

export default Signin;
```

In this example, we use a static username and password to test the programmatic navigation. We will use this to validate the user input and based on that update a local storage object with the authentication state.

When the user submits the form, we're preventing the default form submission behaviour using `e.preventDefault()`, performing the sign in logic and finally redirecting the user to the homepage using `useNavigate` hook.

What we also do is when the user lands on the sign in page for the time the local storage entry for `authenticated` is set to false.

Next, let's add a new route for the Signin component to the `App.tsx` file:

Add an additional route to the Router element in the file for the `Signin` component we created above.

```js
const router = createBrowserRouter([
  // ...
  // ...
  {
    path: "/signin",
    element: <Signin />,
  }
]);
```

Also let us make sure that the always visible component, in this case, the `Header` should not be visible on the sign in page. Use can use  `window.location.pathname` for this scenario.

The final `App.tsx` might look something like this after the changes.

```js
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Signin from "./Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TaskListPage />,
  },
  {
    path: "/tasks/:id",
    element: <TaskDetailsPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);


const App = () => {

  return (
    <div>
      {window.location.pathname !== "/signin" && <Header />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App
```

Now, when the user navigates to `/signin`, the Signin component will be rendered.

While this scenario works, if you navigate to the app using `https://localhost:5173` the Home page is still displayed. To prevent that, we need to create a ProtectedRoute. This helps you to programmatically decide what happens when a route is accessed.

Let's create a file called `ProtectedRoute.tsx` in the `src` folder and add the following code.

```js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = localStorage.getItem("authenticated");
  if (authenticated === 'true') {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}
```

The above code checks for the validity of the `authenticated` entry in local storage and based on that sets the navigation route.

Next, let's update the `App.tsx` to wrap our elements with the `ProtectedRoute`. The updated `App.tsx` code will be as below.

```js
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Signin from "./Signin";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks",
    element: (
      <ProtectedRoute>
        <TaskListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks/:id",
    element: (
      <ProtectedRoute>
        <TaskDetailsPage />
      </ProtectedRoute>
    ),
  },
]);


const App = () => {

  return (
    <div>
      {window.location.pathname !== "/signin" && <Header />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App
```

In this example, we're creating wrappers for the existing routes with `ProtectedRoute` and this prevents the routes from loading if the criteria are not met.

That's it! Now, when the user tries to access the Home page without being authenticated, they'll be redirected to the sign in page. And when they sign in successfully, they'll be redirected to the Home page.

Let us add a `Signout` option on the Header component, so the user can sign out from within the application.

We do this by adding a link to the Sign in page from within the application. As the Localstorage value for `authenticated` is reset on landing on the Sign in page, the user is Signed out from the application.

The final `Header.tsx` might look something like this.

```js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

 return (
   <nav className="bg-gray-800 py-4">
     <div className="mx-auto px-4">
       <div className="flex justify-between">
         <div className="flex items-center w-1/3">
           <Link to="/" className="ml-6 text-gray-300 hover:text-white">
             Home
           </Link>
           <Link to="/tasks" className="ml-6 text-gray-300 hover:text-white">
             Tasks
           </Link>
         </div>
         <div className="flex items-center w-1/3 justify-center">
           <h1 className="text-white text-lg font-bold">Task Manager</h1>
         </div>
         <div className="flex items-center w-1/3 justify-end">
           <Link to="/signin" className="ml-6 text-gray-300 hover:text-white">
             Signout
           </Link>
         </div>
       </div>
     </div>
   </nav>
 );
};

export default Header;
```

Routing is an important concept when learning React, and this form the basis of how the application state is transferred between different routes in the application. You can learn more in-depth references of how the React Router works by following the below links. See you at the next level.
## References:

[React Router detailed Tutorial v6](https://reactrouter.com/en/main/start/tutorial)