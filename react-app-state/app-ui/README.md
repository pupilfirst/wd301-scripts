# Text
In this lesson, we will enhance the visual appeal of our Smarter Tasks application using TailwindCSS and [headlessUI](https://headlessui.com/). 

headlessUI is a powerful library of UI components that simplifies the development process by providing pre-built components with built-in JavaScript functionality. These components, such as dialogs and dropdowns, come with ready-to-use logic, eliminating the need for us to write the code from scratch. While headlessUI offers a limited set of components on their website, we will find that it includes everything necessary to elevate the user experience of our Smarter Tasks application.

### Step 1: Install and configure headlessUI
In our project we aleready have the TailwindCSS installed and configured. Next, we have to install headlessUI in our project. For that, we will run the following command in our terminal (of course inside our project folder):

```sh
npm install @headlessui/react --save
```

Then,

### Step 2: Install heroicons library
In our project, we will integrate the [heroicons](https://heroicons.com/)  library to enhance the visual representation of icons. Heroicons provides a wide range of beautifully designed icons that can be easily integrated into our application. To install heroicons, we will run the following command in terminal:

```sh
npm install @heroicons/react --save
```

# Script 1: Design the layouts
Next, we will focus on designing the layout for logged-in users. Once a user logs in to our application, we want to provide them with a user-friendly and consistent navigation experience. We will create a navbar at the top of the page, featuring links to important sections such as projects, members, and the profile page.

To ensure consistency across all pages, we will encapsulate this navbar within a layout component. The layout component will serve as a container for the common elements shared by all pages that logged-in users have access to. By keeping these elements in the layout component, we avoid duplicating code and make it easier to maintain and update the user interface.

### Step 1: Define the layout:
For that, we will create a `layouts` folder inside our `src` directory.
> Create the `layouts` folder.

Next, inside the `layouts` folder, we will create another folder named `account` to keep the account layout files.
> Create the `account` folder.

Then, inside the `account` folder we will create a `index.tsx` file, where we will define the `AccountLayout` component.
```tsx
import * as React from "react"

const AccountLayout = () => {
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/*Route specific contents will come here*/}
      </div>
    </main>
  )
}

export default AccountLayout
```

### Step 2: Let's design the Appbar component
Next, we will design a navbar or appbar for our account layout. For that, I've simply checked the TailwindCSS components, and there I've found [a basic navbar design](https://tailwindui.com/components/application-ui/navigation/navbars), and I think that's sufficient for us. 
> Action: Open the URL. Then we will use the very first navbar. On right hand side, select React and check the code. 

So, we will copy the whole code and then we will do some adjustments based on our requirements. 
For that, we will create a `Appbar.tsx` file inside the `src/layouts/account` folder, and paste the code here.

And then we will change the contents, as per our design:
```tsx
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"

const userNavigation = [
  { name: 'Profile', href: '#' },
  { name: 'Sign out', href: '/logout' },
]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const { pathname } = useLocation()

  const navigation = [
    { name: 'Projects', href: '/account/projects', current: false },
    { name: 'Members', href: '/account/members', current: false },
  ]

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img
                    className="h-8"
                    src={Logo}
                    alt="Smarter Tasks"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => { 
                      const isCurrent = pathname.includes(item.href)

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? 'bg-slate-50 text-blue-700'
                              : 'text-slate-500 hover:text-blue-600',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                    )})}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;
```

So here,
1. First, I've kept a logo for our application, in the `src/assets/images` folder, 
![img](./logo.png)
Then I've imported it here in this `Appbar` component
```tsx
  import Logo from "../../assets/images/logo.png"
```

2. Then I've defined the user navigation links
```js
const userNavigation = [
  { name: 'Profile', href: '#' },
  { name: 'Sign out', href: '/logout' },
]
```
And then I've used these links on the right hand side of the navbar.

3. Then we've defined the primary links for logged-in users
```js
  const navigation = [
    { name: 'Projects', href: '/account/projects', current: false },
    { name: 'Members', href: '/account/members', current: false },
  ]
```

4. And finally, to add some styling for currently active link, I've used the `useLocation()` hook from the `react-router-dom` library.

### Step 3: Import Appbar in the layout
Next, we will import and use the `Appbar` component in our `AccountLayout` component.
```tsx
import * as React from "react"
import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"

const AccountLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/*Route specific contents will come here*/}
        </div>
      </main>
    </>
  )
}

export default AccountLayout;
```

### Step 4: Finding a way to show contents of child component
Now our account layout is almost ready, but it has one problem. We haven't defined how the route specific contents will show up here. This means we have to give a placeholder for rendering child components.

And for that, we will use a special component called, `Outlet` from the react-router-dom library. `Outlet` is primarily used in nested route configurations to define the location where child components should be rendered.

So, first we will simply import `Outlet` from the `react-router-dom` library.
```tsx
import * as React from "react"
import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"

const AccountLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout

```
Then we've simply used `Outlet` inside the `main`.

And that's it, we've successfully configured our account layout.


# Script 2: Re-defining app routes
Next, we will optimize the routes of our application by creating a separate routes file. This will help us organize and manage our routes more effectively. By centralizing our routes, we can easily maintain and update them as our application grows. So, let's begin this process to enhance our routing implementation.

### Step 1: Create the files and folder structure
First we will create a separate folder named `routes` inside the `src` directory.
> Action: Create the routes fodler
Then inside the new `routes` folder, we will create a `index.tsx` file, where we will keep all of our routing configurations.
> Action: Create the index.tsx file

### Step 2: Define the routes using `createBrowserRouter`
Before defining our app's routes, let's have a look at the official website of [React Router](https://reactrouter.com/en/main).
> Action: visit https://reactrouter.com/en/main/start/overview
> Click: I'm new (which will take you to a new page)
> Visit the [Adding a router](https://reactrouter.com/en/main/start/tutorial#adding-a-router) section in this page

So as you can see, React Router introduced the new [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router) hook, to define routes of a React application. And when I'm recording this lesson, this is the recommended router for all React Router web projects.

Along with that, `createBrowserRouter` also allows us to define our routes as a plain JavaScript object. So let's define the routes:

```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin"
import Signup from "../pages/signup"

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Signin />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  }
]);
export default router;
```
Here,
- first we've imported `createBrowserRouter` from `react-router-dom`.
- then we've used `createBrowserRouter` to define the root route, which will show the signin page by default, a dedicated route for signin page and the route for signup page.

### Step 3: Load the router in `App` component
OK, so our basic router is ready. Now we have to load and connect this new router in `App` component. So, I'll open the App component (means the `App.tsx` file) and there first I'll import the `RouterProvider` from `react-router-dom`. You can see the `RouterProvider` as an upgraded version of `BrowserRouter`.
```tsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
```
Here I've also imported the `router` from the `routes` folder and provided it to the `RouterProvider`.

Next our primary index.tsx file (means the `src/index.tsx` file) needs a fix, as we have to remove the `BrowserRouter` from there.

> Remove the BrowserRouter from `index.tsx` file

The uppdated code would look something like this:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Now we are all set to test our new app routes. So, let's open http://localhost:3000 in browser to check if everything is working properly.
> Action: open http://localhost:3000 in the browser and show output. First the signin page should come, then check the /signup and /signin routes as well.

### Step 4: Now let's define the protected path `/account`
So far we've defined the public routes in our route file. Next, we will define the protected routes.

For that, first we've to make sure that all of our protected routes uses the `AccountLayout`, that we've defined earlier (in the layouts/account/index.tsx file).

So, I'll define a new path called "*account*" in the `src/routes/index.tsx file`:
```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin"
import Signup from "../pages/signup"
import AccountLayout from "../layouts/account"
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Signin />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
  // Protected Routes
  {
    path: "account",
    element: <AccountLayout />
  },
]);
export default router;
```

Ok, now to protect the `/account` path from unauthorised access, we will use the `ProtectedRoute` helper that we've defined earlier. 

To do that, first I'll move it inside the `src/routes` folder, and then I'll update the content to return a fragment (means the react fragment: <></>) with `children`, instead of `element`:
```tsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation()

  const isAuth = !!localStorage.getItem("authToken");
  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/signin" replace  state={{ referrer: pathname }} />;
}
```

Next, we will import `ProtectedRoute` inside our router (i.e src/routes.index.tsx), and then we will wrap our `AccountLayout` with `ProtectedRoute`, like this:
```tsx
import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin"
import Signup from "../pages/signup"
import AccountLayout from "../layouts/account"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Signin />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
  },
  // Protected Routes
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    )
  },
]);

export default router;
```

### Step 5: Now let's define the protected routes for projects and members
Now we are all set to define our routes for projects and members. We will define them as child routes of `/account`:
```tsx
import { createBrowserRouter } from "react-router-dom";

import AccountLayout from "../layouts/account"
import ProtectedRoute from "./ProtectedRoute"
import Signin from "../pages/signin"
import Signup from "../pages/signup"
import Projects from "../pages/projects"
import Members from "../pages/members"

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Signin />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
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
        element: (<Projects />)
      },
      {
        path: "members",
        element: (<Members />)
      },
    ],
  },
]);

export default router;
```
Now at this moment if we would visit the browser, we will get some errors as `"../pages/projects"`, `"../pages/members"` path does not exist.

So let's fix this.

For that we will create a new file `src/pages/projects/index.tsx`, with the following content:
```tsx
const Projects = () => {
  return (
    <h2>Projects</h2>
  )
}
export default Projects;
```

And then we will create `src/pages/members/index.tsx`, with the following content:
```tsx
const Members = () => {
  return (
    <h2>Members</h2>
  )
}
export default Members;
```

Ok, now let's test it out.
> Action: Open http://localhost:3000 in browser
> Login (and it will redirect you to /dashboard path which is not defined in this route)

So as you can see, after login we are getting redirected back to the `/dashboard` path which we've defined earlier in our `SigninForm` component. Now we've to change the after signin path to `/account`.
```tsx
// src/pages/signin/SigninForm.tsx

    try {
      // ...
      // ...

      // Redirect users to account path after login
      navigate("/account")

    } catch (error) {
      console.error('Sign-in failed:', error);
    }
```

Similarly, in `SignupForm.tsx`, we've change the after signup path to `/account`.
```tsx
// src/pages/signup/SignupForm.tsx

    try {
      // ...
      // ...

      // Redirect users to account path after signup
      navigate("/account")

    } catch (error) {
      console.error('Sign-up failed:', error);
    }
```
That's it, so let's test it out.
> Action: Open http://localhost:3000 in browser
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
import { Navigate } from "react-router-dom"

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
  }, [])
  
  return <Navigate to="/signin" />;
}

export default Logout;
```

And that's it, let's test it out.
> Action: Open http://localhost:3000 in browser
> Signin and logout to show both features

So as you can see,
- Signin is working
- After signin we are successfully getting redirected to the `/account` path
- We can navigate to Projects and Members path
- And we can logout
  
Though we can fine-tune this overall experience even more, like:
- If an user is already logged-in, and if he/she visits the root path (`/`), now he/she is getting the signin page, but instead of that we can redirect the him/her to `/account` page and show the projects.
- And after signin we are getting a blank page, which can be improved by redirecting the users to `/account/projects` path.

Let's do that
### Step 7: Final fine-tunings
```tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
// ...
// ...
// ...
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/projects" replace /> },
  {
    path: "/signin", 
    element: <Signin />
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
        element: (<Projects />)
      },
      // ...
      // ...
    ],
  },
]);  
```
So, we've fixed these issues by redirecting the users, using `Navigate` from React Router.

Now everything looks to be in order, as we expected.

So, that's it for this lesson, see you in the next one.