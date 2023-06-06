# Script
In this lesson we will implement our application state, so let's get started.

### Step 1: Preparing the reducer
So, to start with the implementation, first we will move the `reducer` function from the `ProjectList` component to the `src/context/projects/reducer.ts` file.
```ts
interface Project {
  id: number;
  name: string;
}

// Dialogue 1: I'll rename this interface from State to ProjectsState. And I'll also export the interface.
export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// Dialogue 2: Next, I'll comment the Action interface
// interface Action {
//   type: string;
//   payload?: any;
// }

// Dialogue 3: Then I'll define a new type called ProjectsActions for all possible combimations of action objects.
export type ProjectsActions = 
  | { type: 'API_CALL_START' }
  | { type: 'API_CALL_END'; payload: Project[] }
  | { type: 'API_CALL_ERROR'; payload: string }


// export const reducer = (state: State, action: Action): State => {

// Dialogue 4: Then I'll update reducer function arrdingly with newly defined types
export const reducer = (state: ProjectsState, action: ProjectsActions): ProjectsState => {
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
- I've also exported the `reducer` function, so that we can import and use it from other file.

Now, as we are planning to make this `reducer` function globally accessible to the `App` component and it's child components, the action type names like: "API_CALL_START", "API_CALL_END", "API_CALL_ERROR" would collide with action type names of other modules. So, to avoid this conflict we've to use a bit more specific names like, `FETCH_PROJECTS_REQUEST`, `FETCH_PROJECTS_SUCCESS`, `FETCH_PROJECTS_FAILURE` etc.
```ts
// Define the action types and payload
export type ProjectsActions = 
  | { type: 'FETCH_PROJECTS_REQUEST' }
  | { type: 'FETCH_PROJECTS_SUCCESS'; payload: Project[] }
  | { type: 'FETCH_PROJECTS_FAILURE'; payload: string }

export const reducer = (state: ProjectsState, action: ProjectsActions): ProjectsState => {
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

// Dialogue 1: Then we will pass the `initialState` object to the `state` of reducer function.
export const reducer = (state: ProjectsState = initialState, action: ProjectsActions): ProjectsState => {
  // ...
  // ...
}
```

Alright, finally our reducer `function` is now ready.

### Step 2: Preparing the actions
Next, we will focus on keeping our *action creator* functions in the `src/context/projects/actions.ts` file. Now, here I'm referring the term *action creator* for first time. 

So, **action creators** are functions, that simplify the creation of action objects. They return a plain JavaScript object that represents an action. By using action creators, you can write cleaner code and enhance reusability.

For example, the `fetchProjects` function, of the `ProjectList` component (`src/context/projects/actions.ts` file). This function is dispatching action objects that has two properties, `type` and `payload`, right?. So, it is nothing but a action creator.

So, in this step, we will move such *project* module related actions or action creator functions to the `src/context/projects/actions.ts` file. 

First, we will move the `fetchProjects` function from the `ProjectList` component to `src/context/projects/actions.ts` file. 
```ts
// src/context/projects/actions.ts

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
- I've also exported the `fetchProjects` function, so that we can use it from other components.
- I've added a new argument called `dispatch`, for this `fetchProjects` function, so that we can dispatch action objects for our project reducer.

As we've moved this function to `src/context/projects/actions.ts` file, we've to update our `ProjectList` component, to call this function from there. We'll do that later.

### Step 3: Preparing the ProjectsProvider component using Context Provider
Next, we will create a `ProjectsProvider` component, to make the *projects state* and *dispatch* method available to it's child components, using the React Context API.

```tsx
// src/context/projects/actions.ts

// Dialogue 1: First, I'll import the createContext, useContext and useReducer from React
import React, { createContext, useContext, useReducer } from "react";

// Dialogue 2: First, I'll import the reducer, initialState, ProjectsState and ProjectsActions from the reducer.ts file
import { reducer, initialState, ProjectsState, ProjectsActions } from "./reducer";

// Dialogue 3: Next, using createContext function, we will create a context for **Projects State** object. The shape of this new context object is ProjectsState and here I've set the default value to undefined.
const ProjectsStateContext = createContext<ProjectsState | undefined>(undefined);

// Dialogue 4: Next, I'll define our ProjectsProvider component, and make this ProjectsStateContext available using context Provider.
export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Dialogue 5: Here, I'll use the useReducer hook to manage state. I've passed the `reducer` function and the `initialState` that I've defined in the reducer.ts file.
  const [state, dispatch] = useReducer(reducer, initialState);

  // Dialogue 6: Then, I'll pass the `state` object as value of this ProjectsStateContext
  return (
    <ProjectsStateContext.Provider value={state}>
      {children}
    </ProjectsStateContext.Provider>
  );
};

```
Next I'll create another context to make the dispatch function available.

```tsx
// src/context/projects/actions.ts

import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, ProjectsState, ProjectsActions } from "./reducer";

const ProjectsStateContext = createContext<ProjectsState | undefined>(undefined);

// Dialogue 2: Lets define a new type called ProjectsDispatch using TypeScript. The React.Dispatch type is a generic type provided by the React library. It represents a function type that can be used to dispatch actions to update state within a React component. It is typically used with the useReducer hook. By defining ProjectsDispatch as this type alias, it allows us to use it in our code to ensure type safety when dispatching actions and handling state updates within the ProjectsProvider component.
type ProjectsDispatch = React.Dispatch<ProjectsActions>;

// Dialogue 1: So first, using createContext function, we will create a context called ProjectsDispatchContext. Let's say the shape of this new context object is ProjectsDispatch (which I'll define now, wait for it.) and I've set the default value to undefined.
const ProjectsDispatchContext = createContext<ProjectsDispatch | undefined>(undefined);

export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Dialogue 3: Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.
  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};
```
Alright, now we've successfully exposed the **projects state and dispatch function** available to all child component of `ProjectsProvider` component.

Now our `ProjectsProvider` is almost ready. 

Almost, because I'll add two custom hooks to easily access the projects `state` and `dispatch` function, inside any child component of the `ProjectsProvider` component.

```tsx
// src/context/projects/actions.ts

export const useProjectsState = () => useContext(ProjectsStateContext);
// Dialogue 1: This line defines a custom hook `useProjectsState`, that uses the `useContext` hook to access the value stored in the `ProjectsStateContext`. The `ProjectsStateContext` is created using the createContext function and is used to store the current `state` of the projects. 
// By using the `useProjectsState` hook in a component, you can retrieve the current `state` of the projects without directly accessing the context or passing down the state as a prop. This simplifies the code and ensures that the state is always up to date.

export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);
// Dialogue 2:  This line defines a custom hook `useProjectsDispatch` that also uses the `useContext` hook to access the value stored in the `ProjectsDispatchContext`. The `ProjectsDispatchContext` is created using the createContext function and is used to store the `dispatch` function for updating the state of the projects.
// By using the `useProjectsDispatch` hook in a component, you can retrieve the `dispatch` function without directly accessing the context or passing it down as a prop. This allows you to dispatch actions to update the state of the projects from anywhere within your component tree that is wrapped with the `ProjectsProvider`.
```

So, finally our context is ready, and we've successfully designed our application state.

Next, using the `ProjectsProvider` component, we've have to make the projects state and dispatch function available to it's child components.

### Step 4: Making the `ProjectsProvider` available in App component and it's child components
```tsx
import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";

// Dialogue 1: To do that, first I'll import the `ProjectsProvider` in the `App` component.
import { ProjectsProvider } from "./context/projects/context";

// Dialogue 2: Then I'll wrap the RouterProvider component with the <ProjectsProvider> component.
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
So, finally we've made the projects state and dispatch function available to all of our routes.


### Step 5: Updating ProjectList component, to fetch data
So next, we've to update our ProjectList component, to import the `fetchProjects` function from the `src/context/projects/actions.ts` file, and use it inside `useEffect` hook.

Now, do you remember? The `fetchProjects` function expects the projects dispatch function as an argument?
> Action: Open the src/context/projects/actions.ts file to show it.
Yes, right? So somehow to have to get access to the dispatch method of projects. 

And the good news is, that's already available to us, when we've defined the `useProjectsDispatch` custom hook in the src/context/projects/context.tsx file.

```tsx
import React, { useEffect } from 'react';
import { fetchProjects } from "../../context/projects/actions";

// Dialogue 1: So, let's import the useProjectsDispatch custom hook.
import { useProjectsDispatch } from "../../context/projects/context";

// Dialogue 5: So, I'll import the ProjectListItems component from the same folder. Which I'll define next.
import ProjectListItems from './ProjectListItems';

const ProjectList: React.FC = () => {
  // Dialogue 2: I'll define a new constant called dispatchProjects, to call the useProjectsDispatch() hook.
  const dispatchProjects = useProjectsDispatch();
  
  useEffect(() => {
    // Dialogue 3: And I'll pass the `dispatchProjects` to fetchPro`jects function.
    fetchProjects(dispatchProjects)
  }, [])

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      {/* Dialogue 4: To keep this file clean, I'll move all the logic to access the projects from our app-state, to a new component ProjectListItems */}
      <ProjectListItems />
    </div>
  );
};

export default ProjectList;
```

### Step 6: We will create a new component `ProjectListItems`
Now, lets create a new component `ProjectListItems.tsx` inside the `src/pages/projects` folder.

```tsx
// src/pages/projects/ProjectListItems.tsx
import React from "react";
// Dialogue 1: First, I'll import the useProjectsState custom hook to access projects state.
import { useProjectsState } from "../../context/projects/context";

export default function ProjectListItems() {
  // Dialogue 2: I'll define a new constant called `state`, to call the useProjectsState() hook, and get access to projects state.
  let state: any = useProjectsState();

  // Dialogue 3: Next, I'll destructure the state object to gain access to projects, isLoading, isError and errorMessage property.
  const { projects, isLoading, isError, errorMessage } = state
  console.log(projects);

  // Dialogue 4: If isLoading is true, and there are no projects, in that case, I'll show a loading text
  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  // Dialogue 5: next, if there is an error, I'll show the error message.
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Dialogue 6: And finally I'll iterate over the projects object to show the individual projects card.
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
And that's it. 

Now, let's check if the projects page is working our browser or not:
> Action: open http://localhost:3000 in browser

And, as you can see, the list of projects are coming.
So, we've successfully accessed projects from application-level state.

### Step 7: Fixing the NewProject component
Currently the `NewProject` component contains the entire project creation logic. Though we can move the API call to the `POST /projects` endpoint, to a new function called `addProject` inside the `src/context/projects/actions.ts` file.
```ts
export const addProject = async (dispatch: any, args: any) => {

  try {
    const token = localStorage.getItem("authToken") ?? "";

    const response = await fetch(`${API_ENDPOINT}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error('Failed to create member');
    }

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message }
    }

    dispatch({ type: 'ADD_PROJECT_SUCCESS', payload: data });
    return { ok: true }
  } catch (error) {
    console.error('Operation failed:', error);
    return { ok: false, error }
  }
};
```
