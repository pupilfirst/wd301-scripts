In the previous lesson, we covered the fundamental concepts of React Context and explored the steps involved in creating, providing, and consuming context. Building upon that knowledge, in this lesson, we will put our learning into practice by developing a theme switcher that allows users to toggle between dark mode and light mode.

In today's world, it has become common for modern websites to offer the option of switching between different colour schemes, providing convenience to users based on their preferences. From this point forward, we will embark on the exciting journey of constructing this feature from scratch using React Context.

Are you ready? Let's dive right in!

## Step 1: Defining the `ThemeContext`

So, before defining our `ThemeContext`, I would like to create a `context` folder inside the `src` directory. So, from now onwards, we will keep all of our app contexts here only.

> Action: create the context folder inside the src directory

Next, we will create a new file called `theme.ts` inside the `src/context` directory.

> Action: create the `theme.ts` file inside the src/context directory
> In this file, first, we will import the `createContext` function from React.

```ts
import { createContext } from "react";
```

And then we're going to use `createContext` to create a new context object called `ThemeContext`.

```ts
import { createContext } from "react";

const ThemeContext = createContext("light");

export default ThemeContext;
```

From React v17 onwards, we've to pass a default value to our context object. And in this case, we've passed the string `light` as the default value. Which means, we want our theme to load the **light mode** by default.

## Step 2: Setting the provider

Next, we are going to open the primary main.tsx file (i.e src/main.tsx file). And there we will import our ThemeContext.

```tsx
...
...
import ThemeContext from "./context/theme";
...
...
```

So inside here, we are going to wrap the existing `App` component with our new `ThemeProvider', like this:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContext from "./context/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContext.Provider value="light">
    <App />
  </ThemeContext.Provider>
);
```

We've also set the `value` prop to "light". So, now our `App` component and all of its child components can access this `ThemeContext` value.

## Step 3: Accessing theme value

Now we are all set to access the `ThemeContext` value from any one of our child components. For now, I'll try to access the `ThemeContext` value from the App component. First we have imported the `useContext` hook from React

```tsx
// App.tsx
import React, { useContext } from "react";
...
...
import ThemeContext from "./context/theme";
```

Then we've imported the `ThemeContext`. And then at the top of our component, we will access the context value like this:

```tsx
const App = () => {
  const currentTheme = useContext(ThemeContext)
  return (
    ...
    ...
    ...
  );
}
```

And now we can use this `currentTheme` constant in any way we want. For example, we can print it on screen, like:

```tsx
import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import ThemeContext from "./context/theme";

const App = () => {
  const currentTheme = useContext(ThemeContext);
  return (
    <div>
      {currentTheme}
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
```

Now let's go back to the browser to check if the value of `currentTheme` is getting printed or not.

> Action: visit http://localhost:5173 in browser

So, it's coming! That's great.

Therefore, we are successfully communicating some information, across our different components, without using the `props` system.

The only problem is that right now, if we want to change that value, we would have to go back into our `src/main.tsx` file, and change the hardcoded value to something else.

So if we would change it to 'dark', then it will show up in the browser as well. Therefore, it is clear that we can use context to share information across different components, but having to manually change this value.
Obviously, that is not going to work, and we have to think of some better way of updating that value in some other way.

In the next lesson, we will discover how to change the context value programmatically in React. This technique will empower you to dynamically update and manipulate context data within your application. Don't miss out on this valuable insight. See you in the next lesson!
