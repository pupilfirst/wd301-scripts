# Script

In this video, you will learn about class based components. Though this is not a recommended approach for writing React components anymore, but still it is good to know about them.

First, let's scaffold a React application using Vite with TypeScript support. We can do that by providing the following command once we are inside the `wd301` folder.

`npx create-vite smarter-tasks --template react-ts`

Let's execute the command

> Action: `npx create-vite smarter-tasks --template react-ts`

It will create a folder named `smarter-tasks` and install necessary packages and files. Once it is finished, let's switch to the newly created app by using `cd`.

> Action: `cd smarter-tasks`

```sh
cd smarter-tasks
```

If you look in the `src` folder, you can see two TypeScript files have been created - `main.tsx` and `App.tsx`

`.tsx` is the TypeScript equivalent of JSX. It is JSX but with types.

In earlier versions of React, only class based components could have a state associated with it. So if we need to keep track of changes or provide some useful functionality, class based component was the only way to go.

We use ES6 class to define a component.

A component have to inherit from `React.Component` class. We will next create a `Task` component.

Let's create a new file `Task.tsx`. When creating a component, you have to capitalize the first character.

> Action: Add following code to `Task.tsx`

```tsx
class Task extends React.Component {}
```

A class component will have a `render` method, which will be invoked whenever the internal state changes, and renders the actual component.

```tsx
class Task extends React.Component {
  render() {
    return <div>Buy groceries </div>;
  }
}
```

Once you define a component, you will have to export it, so that, it can be used in other files. After all we create components to reuse it in other parts of our project.

```tsx
export default Task;
```

Now, let's switch back to `App.tsx` and include our `Task` component.

First, let's import the component.

```tsx
import Task from "./Task";
```

Then, let's remove the boilerplate code that renders react icon, and replace with our `Task` component.

```tsx
function App() {
  return (
    <div className="App">
      <Task />
    </div>
  );
}
```

Let's remove the unused imports as well.

> Action: Remove `import reactLogo from './assets/react.svg';` and `import viteLogo from '/vite.svg'` from `App.tsx`

Let's save the file. And run our app. Open the terminal, change to `smarter-tasks`. Then execute the command

```sh
npm run dev
```

This command will compile the TypeScript and will be served on port 3000. Let's visit the address `localhost:5173`.

We can see, `Buy groceries` text is rendered correctly.

See you in the next lesson.

# Text

To create a new React project using TypeScript template, use the command

```sh
npx create-vite my-awesome-app --template react-ts
```

A React component should have it's first character capitalised. In earlier versions of React, only class based components could have a state associated with it. You can create a class based component by extending `React.Component` class. This is not the recommended approach anymore.

You can create a `Task` component like below:

```tsx
import React from "react";

class Task extends React.Component {
  render() {
    return <div>Buy groceries </div>;
  }
}

export default Task;
```
