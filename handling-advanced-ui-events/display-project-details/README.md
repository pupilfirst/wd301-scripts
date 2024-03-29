Now that we have added routes to display project, details, let's add a hyperlink to the project name. So, when a user clicks on it, they will be taken to the detail page of the corresponding project.

Open `src/pages/projects/ProjectListItems.tsx` in VS Code.

To create a hyperlink, we will use the `Link` component from the `react-router-dom` package. It will essentially be rendered as `anchor` tag in final HTML.

Let's import it first.

```tsx
import { Link } from "react-router-dom";
```

`Link` component takes a `to` prop, which will be the `href` of final `a` tag that will be rendered. We will pass `id` as the value of `to` prop. Then the final URL will be a relative URL which will be `/account/projects/:projectID`. Whenever we are creating a list of items in React, we will have to pass a `key` prop as well. It is with the value of the `key`, react uniquely identifies a component in a tree.

We will wrap the `h5` component to make it a hyperlink. It will be linked to `id` of the project. This is how `src/pages/projects/ProjectListItems.tsx` will look like.

```tsx
import React from "react";
import { useProjectsState } from "../../context/projects/context";
import { Link } from "react-router-dom";

export default function ProjectListItems() {
  let state: any = useProjectsState();
  const { projects, isLoading, isError, errorMessage } = state;
  console.log(projects);

  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {projects.map((project: any) => (
        <Link
          key={project.id}
          to={`${project.id}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {project.name}
          </h5>
        </Link>
      ))}
    </>
  );
}
```

Save the file. Now if you hover over the projects, you will see it is a hyperlink. If you click on it, it will render the `Show project details`.

Let's actually render some meaningful information about the project.

Let's create a folder `src/pages/project_details`. Inside the folder, let's create a file `ProjectDetails.tsx`.

In this component, we will extract the value of `projectID`, then filter it out from list of available projects to make sure it is a valid `id`. Then we will go on displaying the name of the project as a header.

`react-router-dom` provides a hook `useParams` to extract the value of a [`dynamic segment`](https://reactrouter.com/en/main/route/route#dynamic-segments) in an URL pattern.

Add the following content to `ProjectDetails.tsx`

```tsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
  const projectState = useProjectsState();
  let { projectID } = useParams();

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];

  if (!selectedProject) {
    return <>No such Project!</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject.name}
        </h2>
      </div>
    </>
  );
};

export default ProjectDetails;
```

Here, we use [`optional chaining`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) to get the first element from the filtered project list. If the array is empty due to an invalid id, it will return undefined.

If no valid project is found, we will render a text `No such Project!`. If a project is found, then we will render its name.

Save the file.

Now, we will create a wrapper component so that we will be able to render child elements like a modal window for creating a task. We will use the `Outlet` component to help us with this.

Create a file `src/pages/project_details/index.tsx` with the following content.

```tsx
import React from "react";

import ProjectDetails from "./ProjectDetails";

import { Outlet } from "react-router-dom";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <>
      <ProjectDetails />
      <Outlet />
    </>
  );
};

export default ProjectDetailsIndex;
```

We have added an `Outlet` component so that we can plug the modal window, which will be used to create tasks in it.

Now, we have to use this component in the routes.

Open `src/routes/index.tsx`. We will import this component.

```tsx
import ProjectDetails from "../pages/project_details";
```

> Note: We are specifying only the folder name here. This will by default import the `default export`-ed component in the `index.tsx` file in `project_details` folder ie, `ProjectDetailsIndex ` component.

Then we will replace the component to be rendered in the route.

```tsx
{
  path: "projects",
  element: <ProjectContainer />,
  children: [
    { index: true, element: <Projects /> },
    {
      path: ":projectID",
      element: <ProjectDetails />,
      children: [
        { index: true, element: <></> },
        {
          path: "tasks",
          children: [
            { index: true, element: <Navigate to="../" replace /> },
            { path: "new", element: <>Show Modal window to create a task</> },
            {
              path: ":taskID",
              children: [{ index: true, element: <>Show Task Details</> }],
            },
          ],
        },
      ],
    },
  ],
},
```

Save the file. Now clicking on a project's name will take to its detail page where we currently display the project name.

See you in the next lesson.
