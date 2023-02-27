# Text

According to React.js documentation:

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
>
> Building your own Hooks lets you extract component logic into reusable functions.

Let's say we need to save data to `localStorage` in multiple components. We will have to reimplement the logic while using function based components. Writing our own custom hook can remove this redundancy.

Following should be kept in mind while creating a custom hook:

- Custom hooks should start with the name `use`, eg. `useLocalStorage`. Without it, React wouldn’t be able to automatically check for violations of rules of Hooks.

- Two components using same hook doesn't share state. ie, every time you use a custom Hook, all state and effects inside of it are fully isolated.
