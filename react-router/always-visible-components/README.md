# Text

Always visible components in React Router refer to components that are displayed on every page of the application regardless of the route or URL. These components can include a header, footer, navigation bar, or any other UI elements that you want to be visible at all times.

In a React Router application, the router component is responsible for rendering the appropriate component based on the current URL or route. By wrapping the routes in a container component that includes the always visible components, we can ensure that these components are displayed on every page of the application.

In this lesson, we will learn how to create always visible components in our application.

Firstly, let's create a new component that we want to be always visible. For the purpose of this tutorial, let's create a header component that will be visible on all pages of our application.

Create a new file called `Header.tsx` in the src/components folder.

In the `Header.tsx` file, add the following code to create a simple header component.

```js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Task Manager</h1>
    </header>
  );
};

export default Header;
```

Next, we need to modify our `App.tsx` file to include the Header component in all pages. We can do this by wrapping our routes in a div and rendering the Header component inside it.

```js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from './pages/TaskDetailsPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks" component={TaskListPage} />
          <Route exact path="/tasks/:id" component={TaskDetailsPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

Now, when we navigate to any page of our application, the Header component will be visible.

We have successfully created always visible components in React Router in our project. We can use this approach to create any component that we want to be always visible, such as a footer or a sidebar in the application.

See you in the next one!
