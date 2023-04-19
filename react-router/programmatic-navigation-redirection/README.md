# Text

In this lesson, we will learn about how programmatic navigation and route redirections work in React Router.

Programmatic navigation and redirections allow you to navigate to different pages in your app or redirect to a different URL programmatically, using JavaScript code instead of clicking on a link or typing in a URL in the address bar.

In React Router, programmatic navigation and redirections are typically done using the history object, which represents the current browsing session's history stack. You can use the history object to push, replace, or go back to a specific URL or route.

Let's say you want to add a signin page to your Create React App project and redirect the user to the homepage after they've signed in successfully.

First, let's create a new Signin component for the signin page:

Create `Signin.tsx` file under the `/src` folder in our `smarter-task` project and copy the lines below.

```js
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform signin logic here...
    // If signin is successful, redirect to the homepage
    history.push("/");
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSignin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Signin;
```

In this example, we're using the `useState` hook to keep track of the username and password inputs. We're also using the `useHistory` hook from the `react-router-dom` package to access the history object.

When the user submits the form, we're preventing the default form submission behaviour using e.preventDefault(), performing the signin logic (which is omitted in this example), and finally redirecting the user to the homepage using history.push("/").

Next, let's add a new route for the Signin component to the `App.tsx` file:

Add an additional route to the Router element in the file for the `Signin` component we created above.

```js
<Route path="/signin" component={Signin} />
```

The final `App.tsx` might look something like this after the changes. 

```js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";
import Signin from "./Signin";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/tasks" exact component={TaskList} />
        <Route path="/tasks/:taskId" component={TaskDetails} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
```

Now, when the user navigates to `/signin`, the Signin component will be rendered.

Finally, let's add a link to the signin page from the homepage:

Add a navigation element with a link to the `Signin` component as below on the `HomePage.tsx` file.

```js
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Task Manager</h1>
      <nav>
        <ul>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default HomePage;
```

Now, when the user clicks the "Sign in" link, they'll be redirected to the signin page. And when they submit the signin form, they'll be redirected back to the homepage.

Let us now try and add a scenario where we want to check if the user is authenticated before allowing them to access the Home page. If the user is not authenticated, we'll redirect them to the signin page instead.

First, let's create a new `useAuth` hook to keep track of the user's authentication state. We'll use the `useContext` hook from React to create a new context for the authentication state:

```js
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  signin: () => void;
  signout: () => void;
}

const AuthContext =
  createContext <
  AuthContextProps >
  {
    isAuthenticated: false,
    signin: () => {},
    signout: () => {},
  };

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signin = () => setIsAuthenticated(true);
  const signout = () => setIsAuthenticated(false);

  const authContextValue = {
    isAuthenticated,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
```

In this example, we're creating a new `AuthContext` context with the `createContext` function. We're also creating a new `AuthProvider` component that wraps the children with the `AuthContext.Provider`. This provider component takes care of setting and updating the authentication state and provides the signin and signout functions to change the authentication state.

Next, let's update the App component by updating the `App.tsx` file to use the AuthProvider:

```js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";
import Signin from "./Signin";
import { AuthProvider } from "./useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/tasks/:taskId" component={TaskDetails} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

Now, let's update the Home component by making changes to the `HomePage.tsx` file, to check if the user is authenticated before allowing them to access the page. We can do this by using the useAuth hook we created earlier:

```js
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "./useAuth";

function HomePage() {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect the user to the signin page if they're not authenticated
    history.push("/signin");
    return null;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Welcome to the Task Manager application!</p>
    </div>
  );
}

export default HomePage;
```

That's it! Now, when the user tries to access the Home page without being authenticated, they'll be redirected to the signin page. And when they sign in successfully, they'll be redirected back to the Home page.
