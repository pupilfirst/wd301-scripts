# Text
In previous lessons, you've already learned about the most used React hooks like `useState` or `useEffect`. And in this lesson we will learn about a React hook called `useReducer`. So let's get started.

# Script
React provides a number of powerful features that allow developers to create highly interactive and responsive web applications. One of these features is the `useReducer` hook, which is a powerful tool for managing state in React.

The `useReducer` hook is quite similar to the useState hook (to some extent). But the `useReducer` hook allows us to manage state in a more structured way than the `useState` hook. And in this lesson, we will explore the `useReducer` hook and its benefits.

### What is useReducer in React?
The useReducer hook is a built-in hook in React that provides a way to manage complex state transitions in your application. As I said before, it is similar to the `useState` hook, but instead of managing a single state value, it manages a state object and allows you **to dispatch actions to update the state**.

The `useReducer` hook is based on the concept of a **reducer** function, which is a pure function that takes the *current state* and an *action* as input and returns a new state. The reducer function is responsible for updating the state based on the action that is dispatched.

The useReducer hook takes two arguments: the **reducer** function and the **initial state**. The initial state is the default state that is used when the component is first rendered. The reducer function is a pure function that takes the current state and an action as input and returns a new state.

### Let's create a new Component and learn to use the useReducer hook.

Using the useReducer hook in React is quite simple. First, we will create a component called `Counter.tsx` in the src `folder`. 

1. Then we will import the `useReducer` hook from the 'react' library:
```js
import React, { useReducer } from 'react';
```

2. Then we will define the initial state of our component using an object:

```js
const initialState = {
  count: 0,
  message: 'Hello world!'
};
```

3. Then, we have to define the reducer function that will be used to manage state transitions.:

```javascript
type State = { count: number }

type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'setMessage':
      return { ...state, message: action.payload };
    default:
      throw new Error();
  }
}

```

In this example, the `reducer` function takes a `state` object with a `count` property and an `action` object with a `type` property. If the action type is "INCREMENT", the reducer function returns a new state object with the count property incremented by 1. If the action type is "DECREMENT", the reducer function returns a new state object with the count property decremented by 1. If the action type is `setMessage`, then it sets a message to the state object. But, if the action `type` is not recognized, the reducer function throws an error.

4. Now as we have defined our reducer function, we can use the `useReducer` hook to manage state in our component.

```javascript
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const increment = () => {
    dispatch({ type: "INCREMENT" });
  }

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  }

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <input type="text" value={state.message} onChange={(e) => dispatch({ type: 'setMessage', payload: e.target.value })} />
    </div>
  );
}
```

In this example, the `Counter` component uses the `useReducer` hook to manage its state. The state object contains two properties, `count` and `message`, and the `reducer` function defines three actions to modify the state: `INCREMENT`, `DECREMENT`, and `setMessage`. The `dispatch` function is used to trigger the **actions** and update the **state**.


### So to summarize, when useReducer hook can be useful?
There are several benefits to using the useReducer hook in React. One of the main benefits is that it allows us to manage complex state transitions in a more structured and efficient manner. By using the `reducer` function to manage state transitions, we can keep your code organized and easy to read.

Another benefit of using the useReducer hook is that it allows us to encapsulate state and state transitions within a single component. This makes it easier to manage state changes and reduces the likelihood of introducing bugs into your code.

So, that's it for this lesson, see you in the next one.