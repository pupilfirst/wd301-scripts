# Text
In the previous lesson, we covered the fundamental concepts of React Context and explored the steps involved in creating, providing, and consuming context. Building upon that knowledge, in this lesson, we will put our learning into practice by developing a theme switcher that allows users to toggle between dark mode and light mode.

# Script

In today's world, it has become common for modern websites to offer the option of switching between different color schemes, providing convenience to users based on their preferences. From this point forward, we will embark on the exciting journey of constructing this feature from scratch using React Context.

Are you ready? Let's dive right in!

### Step 1: Defining the ThemeContext
So, before defining our `ThemeContext`, I would like to create a `context` folder inside the `src` directory. So, from now onwards we will keep all of our app contexts here only. 
> Action: create the context folder inside the src directory

Next, we will create a new file called `theme.ts` inside the `src/context` directory.
> Action: create the `theme.ts` file inside the src/context directory
In this file, first we will import the `createContext` function from React.
```ts
import { createContext } from "react";
```

And then we're going to use `createContext` to create a new context object called `ThemeContext`.
```ts
import { createContext } from "react";

const ThemeContext = createContext('light');

export default ThemeContext;
```
From React v17 onwards, we've to pass a default value to our context object. And in this case we've passed the string `light` as default value. Which means, we want our theme to load the **light mode** by default.

### Step 2: Setting the provider
Next, we are going to open primary index.tsx file (i.e src/App.tsx file). And there we will import our ThemeContext.
```tsx
...
...
import ThemeContext from "./context/theme";
...
...
```
So inside here, we are going to wrap the existing `App` component with our new Theme Provider, like this:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContext from "./context/theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeContext.Provider value="light">
    <App />
  </ThemeContext.Provider>,
);

reportWebVitals();
```
We've also set the `value` prop to "light". So, now our `App` component and all of it's child components can access this `ThemeContext` value.

### Step 3: Accessing theme value
So, now we are all set to access the `ThemeContext` value from any one of our child component. For now, I'll try access the ThemeContext value from the App component. So, first we have import the useContext hook from React
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
import router from "./routes"
import ThemeContext from "./context/theme";

const App = () => {
  const currentTheme = useContext(ThemeContext)
  return (
    <div>
      {currentTheme}
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
```

Now let's go back to the browser to check if the value of `currentTheme` is getting printed or not.
> Action: visit http://localhost:3000 in browser

So it's coming! that's great.

So we are successfully communicating some information, across our different components without using the props system.

The only problem is that right now, if we want to change that value, we would have to go back into our `index.tsx` file, and change the hardcoded value to something else.
> Show the index.tsx file where we are setting thre Theme provider value.

So if we would change it to 'dark', then it will show up in browser as well. So it is clear that we can use context to share information across different components, but having to manually change this value.
Obviously, that is not going to work, and we have to think of some better way of updating that value in some other way.