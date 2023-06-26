# Text

React Suspense is a React feature used to enable better handling of asynchronous operations, such as data fetching or code splitting. It allows you to suspend rendering a component while it's waiting for some asynchronous operation to complete, like loading data from an API or loading a component lazily.

Lazy loading, on the other hand, refers to the technique of deferring the loading of a component or module until it is actually needed. This can significantly improve the initial loading time of your application by splitting the code into smaller chunks and loading them only when required.

Now let's dive into the steps for implementing React Suspense and lazy loading in our existing React application:

- Make sure your React and React DOM versions are at least 16.6 or above, as React Suspense was introduced in version 16.6. You can confirm these from your `package.json`

- Choose a component that you want to load lazily. Let us pick from the existing components that we have already created in the previous levels.

- In your main file where we include the particular component, import the React library and wrap the import of the selected component with the `React.lazy` function:

```js
import React, { Suspense } from "react";

const selectedComponent = React.lazy(() => import("./SelectedComponent"));

const App = () => {};
```

Here, the import('./SelectedComponent') syntax uses dynamic import, which allows the component to be loaded lazily.

- Create a new file called `ErrorBoundary.js` to define your `ErrorBoundary` component:

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

The `ErrorBoundary` component will catch any errors thrown by its children components.

- Wrap the component that uses the selected component inside the <Suspense> component and the <ErrorBoundary> component. The <Suspense> component takes a fallback prop, which is content to be rendered while the lazy component is loading. The <ErrorBoundary> component will catch any errors that occur within its children components:

```js
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <div>
      {/* Other components */}
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <SelectedComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
```

In this example, if an error occurs within the `SelectedComponent`, it will be caught by the `ErrorBoundary` and render the "Something went wrong." message.

- Now, build and run the React application as we normally would. The `SelectedComponent` will be loaded lazily when required, and any errors that occur within the component will be caught by the `ErrorBoundary`.

With lazy loading, your application can dynamically load components only when needed, reducing the initial bundle size and improving the overall performance. React Suspense simplifies handling asynchronous operations and provides a clean way to suspend rendering until the required data or component is ready.

With the above changes, we have successfully configured React Suspense and lazy loading in our Application. These are powerful features that enhance the performance and user experience of your React applications. By combining these techniques, you can optimize your application's performance and ensure a smooth user experience.

See you in the next one!!!
