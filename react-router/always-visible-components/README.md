# Text

Always visible components in React Router refer to components that are displayed on every page of the application regardless of the route or URL. These components can include a header, footer, navigation bar, or any other UI elements that you want to be visible at all times.

In a React Router application, the router component is responsible for rendering the appropriate component based on the current URL or route. By wrapping the routes in a container component that includes the always visible components, we can ensure that these components are displayed on every page of the application.

In this lesson, we will learn how to create always visible components in our application.

So, as per the latest release of React Router, if you want to show some common components for certain routes, you should create something called an **app shell**. Now that "app shell" is really nothing more than a layout with a pathless route.

So, let's start with the implementation.

### Step 1: First we will create a Header component which will be common for all routes.
For that, we will create a new file called `Header.tsx` in the `src/components` folder of our `smarter-tasks` project.

In the `Header.tsx` file, add the following code to create a simple header component with navigation for the routes we created.
```tsx
// src/components/Header.tsx
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link to="/">
              Home
            </Link>
            <Link to="/tasks">
              Tasks
            </Link>
          </div>
          <div className="flex items-center">
            <h1 className="text-white text-lg font-bold">Smarter Tasks</h1>
          </div>
          <div className="flex items-center w-1/3 justify-end">
         </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

### Step 2: Next, we will define our layout
So, we'll create a new component called `Layout.tsx` inside our `src` directory. 
```tsx
// src/Layout.tsx
import Header from './components/Header';

const Layout = () => {

  return (
    <>
      <Header />
      <main>
        {/* We want route specific content to show up in this position */}
      </main>
    </>
  )
}
export default Layout;
```
So, `Layout` is nothing but a simple component, right? But I've kept a placeholder where I want to show some route specific content. How we will do that, we will figure out later.

### Step 3: Now, let's use our new Layout component
For that, we will import the `Layout` component in `App.tsx` file and use it in our route definition.
```tsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Layout from "./Layout";

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
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App
```
Here, I've defined all of our routes (like: homepage, tasks page etc.) as child route of `<Layout>` component. And that's how our `<Layout>` is acting as an **app shell** for all other routes.

Now let's head back to browser to check if it's working or not.
> Action: Open http://localhost:5173/ in browser.
>  So as you can see, the Header component is showing up perfectly, and using the links we can gavigate to Home and Tasks page as well. But something is wrong here, where are our content for Home and Tasks page?

So to fix it, we will use a special component called, `Outlet` from the react-router-dom library. `Outlet` is primarily used in nested route configurations to define the location where child components should be rendered.

So, in our `Layout.tsx` file, first we will simply import `Outlet` from the `react-router-dom` library.
```tsx
import { Outlet } from "react-router-dom"
import Header from './components/Header';

const Layout = () => {

  return (
    <>
      <Header />
      <main>
        {/*Then we will simply used the Outlet in the placeholder that we've created before*/}
        <Outlet />
      </main>
    </>
  )
}
export default Layout;
```
Then we've simply used `Outlet` inside the `main`.

So, let's go back to the browser once again
> Action: Open http://localhost:5173/ in browser.
> And yes, this time it's working as expected.

So, when we navigate to any page of our application, the `Header` component will be visible.

So, we have successfully created always visible components using React Router, in our project. We can use this approach to create any component that we want to be always visible, such as a footer or a sidebar etc.

See you in the next one!
