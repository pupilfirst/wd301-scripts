# Script
In this lesson we will implement our application state, so let's get started.

### Step 1: Preparing the reducer
So to start with the implementation, first we will move the `reducer` function from the `ProjectList` component to the `src/context/projects/reducer.ts` file.
```ts
interface Project {
  id: number;
  name: string;
}

interface State {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

interface Action {
  type: string;
  payload?: any;
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "API_CALL_START":
      return {
        ...state,
        isLoading: true
      };   
    case "API_CALL_END":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };      
    case "API_CALL_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true, 
        errorMessage: action.payload
      };           
    default:
      return state;
  }
}
```
Here, 
- I've added two more keys to the state object, `isError` and `errorMessage`. This will help us to show proper error messages, incase anyhing goes wrong at the API endpoint.
- I've also exported the reducer function, so that we can import it from other file.


Now, as we are planning to make this `reducer` function globally accessible to the `App` component and it's child components, the action type names like: "API_CALL_START", "API_CALL_END", "API_CALL_ERROR" would collide with action type names of other modules. So, to avoid this conflict we've to use more specific names like, `FETCH_PROJECTS_REQUEST`, `FETCH_PROJECTS_SUCCESS` and `FETCH_PROJECTS_FAILURE`:
```ts
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_PROJECTS_REQUEST":
      return {
        ...state,
        isLoading: true
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
        errorMessage: action.payload
      };           
    default:
      return state;
  }
}
```

Next, we will define and set the initial state for this reducer function:
```ts
// Define the initial state
export const initialState: State = {
  projects: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export const reducer = (state: State = initialState, action: Action): State => {
  // ...
  // ...
}
```

### Step 2: Preparing the actions
Next, we will move the fetchProjects function from the `ProjectList` component to `src/context/projects/actions.ts` file.
```ts
import { API_ENDPOINT } from '../../config/constants';

export const fetchProjects = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  
  try {
    dispatch({ type: "FETCH_PROJECTS_REQUEST" });

    const response = await fetch(`${API_ENDPOINT}/projects`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching projects:', error);
    dispatch({ type: "FETCH_PROJECTS_FAILURE", payload: 'Unable to load projects' });
  }
};
```
Here,
- I've exported the fetchProjects function, so that we can use it from other components.
- I've added a new argument `dispatch`, to this `fetchProjects` function so that we can dispatch actions.

### Step 3: Preparing the ProjectsProvider component using Context Provider
```tsx
import React, { useContext, useReducer,  } from "react";
import { reducer, initialState } from "./reducer";

const { createContext } = require("react");

const ProjectsStateContext = createContext();
const ProjectsDispatchContext = createContext();

export const useMembersState = () => useContext(ProjectsStateContext);
export const useMembersDispatch = () => useContext(ProjectsDispatchContext);

export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};
```

### Step 4: Making the `ProjectsProvider` available in App component and it's child components
```tsx
import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <ProjectsProvider>
        <RouterProvider router={router} />
      </ProjectsProvider>
    </div>
  );
}
export default App;
```

### Step 5: Updating ProjectList component, to fetch data
```tsx
import React, { useEffect } from 'react';
import { fetchProjects } from "../../context/projects/actions";
import { useProjectsDispatch } from "../../context/projects/context";
import ProjectListItems from './ProjectListItems';

const ProjectList: React.FC = () => {
  const dispatchProjects = useProjectsDispatch();
  
  useEffect(() => {
    fetchProjects(dispatchProjects)
  }, [])

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <ProjectListItems />
    </div>
  );
};

export default ProjectList;
```

### Step 6: We will create a new component `ProjectListItems`
```tsx
import React from "react";
import { useProjectsState } from "../../context/projects/context";

export default function ProjectListItems() {
  let state: any = useProjectsState();
  const { projects, isLoading, isError, errorMessage } = state
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
        <div key={project.id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
        </div>
      ))}        
    </>
  );
}
```
Now, let's check it in browser:
> Action: open http://localhost:3000 in browser

As you can see, the list of projects is coming.
So we've successfully accessed projects from state.