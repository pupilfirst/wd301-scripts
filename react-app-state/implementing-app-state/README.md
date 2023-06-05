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