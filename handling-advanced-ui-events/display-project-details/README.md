# Text

Now that we have added routes to display project, details, let's add a hyperlink to the project name. So when a user clicks on it, they will be taken to detail page of the corresponding project.

Open `src/pages/projects/ProjectListItems.tsx` in VS Code.

To create a hyperlink, we will use `Link` component from `react-router-dom` package. It will essentially be rendered as `anchor` tag in final html.

Let's import it first.

```tsx
import { Link } from "react-router-dom";
```

`Link` component takes a `to` prop, which will be the `href` of final `a` tag that will be rendered. We will pass `id` as the value of `to` prop. Then the final url will be a relative url which will be `/account/projects/:projectID`. Whenever we are creating a list of items in React, we will have to pass a `key` prop also. It is with value of the `key`, react uniquely identifies a component in a tree.

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

To validate a given project `id`, we will have to send a request to backend. Let's add such a request to project context and actions.

Open `src/context/project/reducer.ts` file.

We will add an `activeProject` key to the `ProjectsState` interface. This key will hold the project details if the given project `id` is valid else it will be `undefined`.

```tsx
export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  activeProject?: Project;
}
```

Now, let's update the `ProjectActions` to include request action, success action and failure action.

```tsx
export type ProjectsActions =
  | { type: "FETCH_PROJECTS_REQUEST" }
  | { type: "FETCH_PROJECTS_SUCCESS"; payload: Project[] }
  | { type: "FETCH_PROJECTS_FAILURE"; payload: string }
  | { type: "ADD_PROJECT_SUCCESS"; payload: Project }
  | { type: "GET_PROJECT_REQUEST" }
  | { type: "GET_PROJECT_SUCCESS"; payload: Project }
  | { type: "GET_PROJECT_FAILURE" };
```

If the request is successful, we will have a payload with project details.

Finally, let's update the reducer as well.

```tsx
export const reducer = (
  state: ProjectsState = initialState,
  action: ProjectsActions
): ProjectsState => {
  switch (action.type) {
    case "FETCH_PROJECTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PROJECTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };
    case "FETCH_PROJECTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_PROJECT_SUCCESS":
      return { ...state, projects: [...state.projects, action.payload] };
    case "GET_PROJECT_REQUEST":
      return { ...state, isLoading: true };
    case "GET_PROJECT_SUCCESS":
      return { ...state, isLoading: false, activeProject: action.payload };
    case "GET_PROJECT_FAILURE":
      return { ...state, isLoading: false, activeProject: undefined };
    default:
      return state;
  }
};
```

Now, we need to add the actual API call to fetch project details from backend.

Open `src/context/project/actions.ts` and add code to fetch a project details.

```tsx
export const fetchProject = async (dispatch: any, projectID: string) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    dispatch({ type: "GET_PROJECT_REQUEST" });

    const response = await fetch(`${API_ENDPOINT}/projects/${projectID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project details");
    }

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message };
    }

    dispatch({ type: "GET_PROJECT_SUCCESS", payload: data });
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({ type: "GET_PROJECT_FAILURE" });
    return { ok: false, error };
  }
};
```

We dispatch `GET_PROJECT_SUCCESS` action with project details if the provided `id` is a valid project id. Else we dispatch a `GET_PROJECT_FAILURE` action.

Save the file.

Now, we will extract `activeProject` value from context in `ProjectDetails` component which will have project details if a valid project id was given. Swith to `ProjectDetails.tsx` file.

Add the following content to `ProjectDetails.tsx`

```tsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
  const projectState = useProjectsState();
  let { projectID } = useParams();

  const selectedProject = projectState?.activeProject;

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

If no valid project is found, we will render a text `No such Project!`. If a project is found, then we will render it's name.

Save the file.

Now, we will create a wrapper component so that we will be able to render child elements like a modal window for creating a task. We will use the `Outlet` component to help us with this.

Create a file `src/pages/project_details/index.tsx` with following content.

```tsx
import React, { useEffect } from "react";

import ProjectDetails from "./ProjectDetails";

import { Outlet, useParams } from "react-router-dom";
import { useProjectsDispatch } from "../../context/projects/context";
import { fetchProject } from "../../context/projects/actions";

const ProjectDetailsContainer: React.FC = () => {
  let { projectID } = useParams();
  const projectDispatch = useProjectsDispatch();
  useEffect(() => {
    if (projectID) fetchProject(projectDispatch, projectID);
  }, [projectID, projectDispatch]);
  return (
    <>
      <ProjectDetails />
      <Outlet />
    </>
  );
};

export default ProjectDetailsContainer;
```

`react-router-dom` provides a hook `useParams` to extract value of a [`dynamic segment`](https://reactrouter.com/en/main/route/route#dynamic-segments) in a url pattern.

We have added an `Outlet` component so that we can plug the modal window which will be used to create tasks in it.

Now, we have to use this component in the routes.

Open `src/routes/index.tsx`. We will import this component.

```tsx
import ProjectDetails from "../pages/project_details";
```

Then we will replace the component to be rendered in the route.

```tsx
{
  path: "projects",
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

Save the file. Now clicking on a project's name will take to it's detail page where we currently display the project name.

See you in the next lesson.
