# Script
So far, we've created the context object and using the provider we've shared the same information to the child components.
![change-context](change-context.png)

So, because we've provided 'light' as the value in the Provider, our context object is going to store the string **'light'** and any component can reach out to the context object and get access to that value.

The downside to our current application is that the string **'light'** is static and fixed. It doesn't change over time, and that's really not very useful. We need to somehow modify that value.

And of course, any time we modify that value, we probably want to make sure that any component that relies upon the value, such as **Appbar**, gets automatically rendered so it can show that new content on the screen.

And yeah.

Does any of this sound kind of familiar?

Let me re-iterate this once again:

We have some data inside of our app, and it's going to change over time. Whenever it changes, we want to re-render our content on the screen. And so that's a sign to us that we probably want to use some **state**.

So here's the idea. Whatever we put as **value** in `ThemeProvider`, we have to change it over time.
![cont2](cont2.png)

Here I want to give it a variable name, say `theme`. So we want to have some kind of `theme` piece of state that is going to change over time. And somehow we've to define a function that can change the `theme` value. We can name that funtion as `setTheme()`. 
![cont3](contx3.png)

And in Provider, instead of passing just the simple string, like **'light'** or **'dark'**, we've to pass both the `theme` variable and `setTheme()` function. So we can pass it as an object, like this:
![cont4](contx4.png)

So now the rest of our application, can receive this object, that has the `theme` piece of state, and a function i.e. `setTheme()`, to change it over time.

So now any component, can reach out to our context, get access to the current `theme` and a function to change it very easily.

And in order to implement that, we will create a new Custom Provider component. So, lets get started.

### Step 1: Creating a custom provider
In this step, we are going to update our existing ThemeContext (i.e the src/context/theme.ts file), to define the custom provider. And this Provider would be nothing but a simple React component.

```tsx
import React, { createContext, useState } from "react";
const ThemeContext = createContext('light')

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const valueToShare = {
    theme: theme,
    changeThemeTo: setTheme
  };

  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
```
So, here 
- we've imported the `useState` hook, as I mentioned earlier that we've to deal with some state management.
- then we've defined the new component called `ThemeProvider`, and there are accessing the `children` property from props.
- after that we are using the `useState` hook to define a simple state called `theme`, with default value set to 'light'.
- then I've defined a const called `valueToShare`, means the values that we would like to share through context. Now for the sake of understanding I've kept this simple name, though you can change it based on your need. Now, we've defined the `valueToShare` const as a simple JS object, which has two properties, `theme` and `changeThemeTo`. So here we are passing the `theme`, and the `setTheme` function to change the state or theme value.
- Now we can share the `valueToShare` object with the rest of our application.
- Then comes the important part, where we're returning the `<ThemeContext.Provider>` with value set to `valueToShare`. And then we are wrapping the `{children}` with the `<ThemeContext.Provider>`. 
- So are you getting the point? The code we've written in our `src/index.tsx` file, means where we've wrapped our App component with `<ThemeContext.Provider>`, we've now moved that piece of code here.
- And finally we are exporting both `ThemeContext` and `ThemeProvider` from this file.
  
Now as we are writing JSX code here, so we've to update the filename as well. We've to rename it as `theme.tsx`, instead of `theme.ts`.

Then, we've to fix the default value in the `createContext()`. We've to change it from a simple string to an object.
```tsx
interface ThemeContextProps {
  theme: string;
  changeThemeTo: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  changeThemeTo: () => {}
});
```
So the default value object now have two properties: `theme` which is a string and `changeThemeTo` which is a function. To make it TypeScript compatible, I've also defined an interface called `ThemeContextProps` to define the type of properties in this object.

So, our step 1 is complete and we've successfully defined the custom provider.
> This is the complete file
```tsx
// src/context/theme.tsx
import React, { createContext, useState } from "react";

interface ThemeContextProps {
  theme: string;
  changeThemeTo: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  changeThemeTo: () => {}
});

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const valueToShare = {
    theme,
    changeThemeTo: setTheme
  };

  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
```