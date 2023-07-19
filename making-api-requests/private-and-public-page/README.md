# Text
In this lesson, we will learn to use the session information stored in localStorage, to determine if a user should view a public page or a protected page.

# Script
In this lesson, we will use conditional rendering in React Router to show public and protected pages, based on user's authentication status.

First, we will create a dashboard page, and then we will configure it to be a protected page.

For that, let's create a new `src/pages/dashboard/index.tsx` file with the following content:
```tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
    </div>
  );
}

export default Dashboard;
```

Next, we will import the Home page in our App component, i.e. *src/App.tsx* file.
```tsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Notfound from "./pages/Notfound";
import Signup from './pages/signup';
import Signin from './pages/signin';
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
...
...
```

Then, we will use the `ProtectedRoute` to configure the `/dashboard` path as a protected route:
```tsx
// ...
// ...
// ...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/notfound",
    element: <Notfound />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Notfound />,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App
```

Time to validate if it's working or not.

> Action: Open http://localhost:5173 in browser.
> First try with /dashboard
> Then login
> Then visit /dashboard

So, as you can see, when I tried to access the `/dashboard` path before login, we got redirected to the login page. Once we've filled the login credentials and submitted the form, we got access to the `/dashboard` path.

# Text
Now at this moment, there are certain files in our project which we don't need right now, and we can simply delete them.

So, as part of cleanup activity, we will remove the following files:
```
src/Form.tsx
src/Layout.tsx
src/ReactPlayground.tsx
src/Signin.tsx
src/Task.tsx
src/TaskApp.tsx
src/TaskCard.css
src/TaskForm.tsx
src/TaskList.tsx
src/types.ts
src/components/Header.tsx
src/pages/HomePage.tsx
src/pages/TaskDetailsPage.tsx
src/pages/TaskListPage.tsx
```

Ok, now it looks clean.