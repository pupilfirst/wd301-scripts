## Re-defining app routes

Next, we will optimize the routes of our application by creating a separate routes file. This will help us organize and manage our routes more effectively. By centralizing our routes, we can easily maintain and update them as our application grows. So, let's begin this process to enhance our routing implementation.

### Step 1: Create the files and folder structure

First, we will create a separate folder named `routes` inside the `src` directory.

> Action: Create the routes folder
> Then inside the new `routes` folder, we will create a `index.tsx` file, where we will keep all of our routing configurations.
> Action: Create the index.tsx file

### Step 2: Define the routes using `createBrowserRouter`

Before defining our app's routes, let's have a look at the official website of [React Router](https://reactrouter.com/en/main).

> Action: visit https://reactrouter.com/en/main/start/overview
> Click: I'm new (which will take you to a new page)
> Visit the [Adding a router](https://reactrouter.com/en/main/start/tutorial#adding-a-router) section in this page

So as you can see, React Router introduced the new [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router) hook, to define routes of a React application. And as of now, this is the recommended router for all React Router web projects.

So let's define the routes:

```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
export default router;
```

Here,

- first, we've imported `createBrowserRouter` from `react-router-dom`.
- then we've used `createBrowserRouter` to define the root route, which will show the sign-in page by default, a dedicated route for the sign-in page and the route for the signup page.

### Step 3: Load the router in the `App` component

OK, so our basic router is ready. Now we have to load and connect this new router in the `App` component. So, I'll open the App component (means the `App.tsx` file) and first I'll clean up everything, and then I'll import the `RouterProvider` from `react-router-dom`.

```tsx
// src/App.tsx

import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "./routes";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
```

Here, I've also imported the `router` from the `routes` folder and provided it to the `RouterProvider`.

Now we are all set to test our new app routes. So, let's open http://localhost:5173 in browser to check if everything is working properly.

> Action: open http://localhost:5173 in the browser and show output. First the signin page should come, then check the /signup and /signin routes as well.

### Step 4: Now let's define the protected path `/account`

So far, we've defined the public routes in our route file. Next, we will define the protected routes.

For that, first we've to make sure that all of our protected routes uses the `AccountLayout`, that we've defined earlier (in the layouts/account/index.tsx file).

So, I'll define a new path called "_account_" in the `src/routes/index.tsx` file:

```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // Protected Routes
  {
    path: "account",
    element: <AccountLayout />,
  },
]);
export default router;
```

OK, now to protect the `/account` path from unauthorised access, we will use the `ProtectedRoute` helper that we've defined earlier.

To do that, first I'll move it inside the `src/routes` folder, and then I'll update the content to return a fragment (means the React fragment: <></>) with `children`, instead of `element`:

```tsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { pathname } = useLocation();

  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/signin" replace state={{ referrer: pathname }} />;
}
```

Next, we will import `ProtectedRoute` inside our router (i.e. src/routes/index.tsx), and then we will wrap our `AccountLayout` with `ProtectedRoute`, like this:

```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "../ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // Protected Routes
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
  },
]);

export default router;
```

### Step 5: Now let's define the protected routes for projects and members

Now we are all set to define our routes for projects and members. We will define them as child routes of `/account`:

```tsx
import { createBrowserRouter } from "react-router-dom";

import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Projects from "../pages/projects";
import Members from "../pages/members";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // Protected Routes
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "members",
        element: <Members />,
      },
    ],
  },
]);

export default router;
```

Now currently if we would visit the browser, we will get some errors as `"../pages/projects"`, `"../pages/members"` path does not exist.

So let's fix this.

For that, we will create a new file `src/pages/projects/index.tsx`, with the following content:

```tsx
const Projects = () => {
  return <h2>Projects</h2>;
};
export default Projects;
```

And then we will create `src/pages/members/index.tsx`, with the following content:

```tsx
const Members = () => {
  return <h2>Members</h2>;
};
export default Members;
```

Ok, now let's test it out.

> Action: Open http://localhost:5173 in browser
> Login (and it will redirect you to /dashboard path which is not defined in this route)

So, as you can see, after login we are getting redirected back to the `/dashboard` path which we've defined earlier in our `SigninForm` component. Now we've to change the after sign-in path to `/account`.

```tsx
// src/pages/signin/SigninForm.tsx

try {
  // ...
  // ...

  // Redirect users to account path after login
  navigate("/account");
} catch (error) {
  console.error("Sign-in failed:", error);
}
```

Similarly, in `SignupForm.tsx`, we've changed the after signup path to `/account`.

```tsx
// src/pages/signup/SignupForm.tsx

try {
  // ...
  // ...

  // Redirect users to account path after signup
  navigate("/account");
} catch (error) {
  console.error("Sign-up failed:", error);
}
```

That's it, so let's test it out.

> Action: Open http://localhost:5173 in browser
> Signin and it should take the user to /account path
> But the logout link is not working

### Step 6: Define the logout route

So as you can see, after login we got successfully redirected to the `/account` path. The UI looks good. But the logout link is not working. Let's fix it.

So, we will add a new route `/logout` in our `src/routes/index.tsx` file

```tsx
import Logout from "../pages/logout";
  // ...
  // ...
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  // Protected Routes
```

Here, we've also imported a new component `<Logout />` from the `/pages/logout` directory, which does not exist at the moment. So we will create the `Logout` component (in `/pages/logout/index.tsx` file) like this:

```tsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);

  return <Navigate to="/signin" />;
};

export default Logout;
```

And that's it, let's test it out.

> Action: Open http://localhost:5173 in browser
> Signin and logout to show both features

Therefore, as you can see,

- Sign-in is working
- After signing in, we are successfully getting redirected to the `/account` path
- We can navigate to Projects and Members path
- And we can log out

Though we can fine-tune this overall experience even more, like:

- If a user is already logged-in, and if they visit the root path (`/`), now they will get the sign-in page, but instead of that we can redirect them to the `/account` page and show the projects.
- And after signing in, we get a blank page, which can be improved by redirecting the users to `/account/projects` path.

Let's do that

### Step 7: Final fine-tunings

```tsx
// src/routes/index.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
// ...
// ...
// ...
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/projects" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  // ...
  // ...
  // Protected Routes
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/account/projects" replace /> },
      {
        path: "projects",
        element: <Projects />,
      },
      // ...
      // ...
    ],
  },
]);
```

So, we've resolved these issues by redirecting the users, using `Navigate` from React Router.
