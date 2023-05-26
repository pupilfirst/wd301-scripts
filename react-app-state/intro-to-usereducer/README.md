# Text
In this lesson, we will learn the rules and steps involved in using the **useReducer** hook.

So far we've learned that, React's `useReducer` hook is a powerful tool that allows us to manage complex state transitions in our application. However, there are some important rules that we need to keep in mind when using this hook to ensure that our code is efficient and maintainable. Let's check them out.

### Rule #1: Define an `Action type`
When using useReducer, it's important to define an **Action type** that represents the possible state transitions in our application. The Action type should be an object that contains a **type** property, which is a string that describes **the action being performed**. You can also include additional properties in the Action object as needed.

```typescript
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'setMessage', payload: string }
```
In this example, we define an Action type that represents three possible state transitions: `INCREMENT`, `DECREMENT`, and `setMessage`. The `setMessage` action includes a **payload** property that contains a value.

### Rule #2: Define an `Action type`







---------------------
Helper contents
---------------------

As I said before, the `useReducer` hook is similar to the `useState` hook, but instead of managing a single state value, **it manages a state object** and allows you **to dispatch actions to update the state**.

The `useReducer` hook takes two arguments: a **reducer** function and the **initial state**. The initial state is the default state that is used when the component is first rendered. The reducer function is a pure function that takes the current state and an action as input and returns a new state.

### Step 2: Define the reducer function:

1. Next, we will define the `reducer` function

```tsx
// Dialogue 1: the reducer function will take two arguments, `state` and `action`. And for now, I;m going to keep it empty.
const reducer = (state, action) => {

}
```
> Action: Now go back to browser: we can expect some errors.

If you would save the file right now and go back over to your browser, you're definitely going to see some errors because down inside of our JS, we are referring to count and value to add. But those variables are no longer defined inside of our file.

We'll fix up those errors in just a moment.

All right.


2. Then we will define the initial state of our component using an object:

```js
const initialState = {
  projects: [],
  isLoading: false
};
```

3. Then, we have to define the reducer function that will be used to manage state transitions.:

```javascript

interface Project {
  id: number;
  name: string;
}

interface ProjectsState = { 
  projects: Project[], 
  isLoading: boolean 
}

const initialState: ProjectsState = {
  projects: [],
  isLoading: false
};

type Actions = {
    type: 'FETCH_PROJECTS_REQUEST' } 
    | { type: 'FETCH_PROJECTS_SUCCESS'; payload: Project[] 
  }

export const projectsReducer: Reducer<ProjectsState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return { ...state, isLoading: true };
    case 'FETCH_PROJECTS_SUCCESS':
      return { ...state, isLoading: false, projects: action.payload };
    default:
      throw new Error();
  }
}

```

In this example, the `reducer` function takes a `state` object with two properties: `projects` and `isLoading` and an `action` object with a `type` property. If the **action type** is "**FETCH_PROJECTS_REQUEST**", the reducer function returns a new state object with the `isLoading` property set to `true`. If the action type is "**FETCH_PROJECTS_SUCCESS**", the reducer function returns a new state object with the `isLoading` property set to `false`, and the `projects` property set to the payload which is coming with the action. In this case, the payload is array of projects, but for you it can anything, like a string, number, boolean value etc. If the action type is `setMessage`, then it sets a message to the state object. But, if the action `type` is not recognized, the reducer function throws an error.

1. Now as we have defined our reducer function, we can use the `useReducer` hook to manage state in our component.

```javascript
const ProjectList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({type: 'FETCH_PROJECTS_REQUEST'})
    const fetchProjects = async () => {
      const response = await fetch(`https://projects-api-endpoint`);
      const data = await response.json();
      dispatch({type: 'FETCH_PROJECTS_SUCCESS', payload: data})
    };
    fetchProjects();
  }, [])

  const { projects, isLoading } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      {projects.map(item => (
        <span key={item.id}>{item.name}</span>
      ))}  
    </div>
  );
}
```

In this example, the `ProjectList` component uses the `useReducer` hook to manage its state. The state object contains two properties, `projects` and `isLoading`, and the `reducer` function defines two actions to modify the state: `FETCH_PROJECTS_REQUEST`, and `FETCH_PROJECTS_SUCCESS`. The `dispatch` function is used to trigger the **actions** and update the **state**.

### So to summarize, when useReducer hook can be useful?
There are several benefits to using the useReducer hook in React. One of the main benefits is that it allows us to manage complex state transitions in a more structured and efficient manner. By using the `reducer` function to manage state transitions, we can keep your code organized and easy to read.

Another benefit of using the useReducer hook is that it allows us to encapsulate state and state transitions within a single component. This makes it easier to manage state changes and reduces the likelihood of introducing bugs into your code.

So, that's it for this lesson, see you in the next one.
