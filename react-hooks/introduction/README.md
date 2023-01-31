# Text

Beginning with the version 16.8, React added support for _Hooks_. Hooks let us use state and other React features without writing class.

## What is a Hook?

According to [React documentation](https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook),

> Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

## Why Hooks are needed?

- It’s hard to reuse stateful logic between components
  - Imagine saving task items that we created to the backend. We won't be able to reuse the syncing logic in any other component as it is tied to this particular component. And it will lead to duplicating the code.
- Complex components become hard to understand
  - Class components eventually grows to unmanageable mess with lot of lifecycle methods and probably each lifecycle methods have a mix of unrelated logic. Hooks let us split into smaller function based components.
- Classes confuse both people and machines
  - To use class in JavaScript, you will have to understand how `this` works. You will have to remember to bind the event handlers. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. 

