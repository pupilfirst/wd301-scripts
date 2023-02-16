# Text

According to [React documentation](https://beta.reactjs.org/reference/react/useEffect):

> `useEffect` is a React Hook that lets you synchronize a component with an external system. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

A common use-case can be to check if a `username` is available or not while a user is signing up. We can use `useEffect` hook to send API requests on each keystroke and show a status message whether the `username` is available or not. Such operations, which modify a local state are called [`side-effects`](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>).

We can define a `useEffect` as follows:

```tsx
useEffect(setup, dependencies?)
```

There can be two variants of `effects`:

- One that does not require a cleanup function.

  ```tsx
  import React, { useEffect } from "react";

  interface TaskAppProp {}
  interface TaskAppState {
    tasks: TaskItem[];
  }

  const TaskApp = (props: TaskAppProp) => {
    const [taskAppState, setTaskAppState] = React.useState<TaskAppState>({
      tasks: [],
    });

    useEffect(() => {
      document.title = `You have ${taskAppState.tasks.length} items`;
    });

    // ...
  };
  ```

- One that require a cleanup function.

  The example where availability of username is checked on every keystroke, we would need to cancel the already sent network requests as the user types a new character. The code to cancel such a request should be passed in the cleanup function. As a rule of thumb, every `connect` needs `disconnect`, `subscribe` needs `unsubscribe`, and `fetch` needs either `cancel` or `ignore` Eg:

  ```tsx
  useEffect(() => {
    // subscribe or connect to services here
    // ...

    return () => {
      // do any clean up code here.
      // unsubscribe / disconnect services
    };
  });
  ```

## Optimizing useEffect

`useEffect` gets called on each render. We can optimize it by passing an array of dependencies. Then react will only trigger `useEffect` whenever an entry in the dependency array changes. Eg: Here we can tell React to run the `useEffect` only when `taskAppState.tasks` gets modified.

```tsx
import React, { useEffect } from "react";

interface TaskAppProp {}
interface TaskAppState {
  tasks: TaskItem[];
}

const TaskApp = (props: TaskAppProp) => {
  const [taskAppState, setTaskAppState] = React.useState<TaskAppState>({
    tasks: [],
  });

  useEffect(() => {
    document.title = `You have ${taskAppState.tasks.length} items`;
  }, [taskAppState.tasks]);

  // ...
};
```

## References

[useEffect](https://beta.reactjs.org/reference/react/useEffect)

[What is a side-effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>)

[You might not need useEffect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)
