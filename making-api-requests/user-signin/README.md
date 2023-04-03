# Script
Hey there! In this lesson you will learn to create a **user signin** form in React. We'll be using `async/await` to make an API call to authenticate the user, and **React Router** to redirect the user after successful sign-in.

So let's get started.

First, we will start with adding the route for the signin page. For that, I'll create a new  `signin` folder inside the `pages` directory.
> Action: Create a new folder called `signin` inside the `pages` directory.

Then, inside the signin `folder` I'll add a new file called `index.tsx` with the following content:
```tsx
import React, { useState } from 'react';

// Dialogue 1: Let's define the Signin component
const Signin: React.FC<> = () => {
  return (
    <div>
      { /* Dialogue 2: with a basic h1 tag, Sign in */}
      <h1>Sign in</h1>
    </div>
  );
}

// Dialogue 3: And finally, we've to export the component
export default Signin;
```

Let's add this new `Signin` component in our `App` component.
```tsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './pages/signup';
import { AuthProvider } from "./useAuth";

// Dialogue 1: First, we've to import the Signin component
import Signin from './pages/signin';
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/signup" element={<Signup />} />
          { /* Dialogue 2: Then we will add route for signin path and render Signin page there */}
          <Route exact path="/signin" element={Signin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
export default App;
```
Now, let's go back to the browser to check if Signin page is coming or not.
> Action: Open browser and show the signin page.

Great! the signin page is coming, now let's create the signin form. For that, I'll create a new file `SigninForm.tsx`, inside the `/src/pages/signin` folder.

> Action: Create SigninForm.tsx inside `/src/pages/signin` directory

Here we will design the Signin form, and I'll add event handlers to store the form field values like: email and password in local state:
```tsx
import React, { useState } from 'react';

const SigninForm: React.FC<> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SigninForm;
```

Then, we will add event handler for form submission, and I'll also make the API call from there:

```tsx
import React, { useState } from 'react';

const SigninForm: React.FC<> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/users/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      
      // Dialogue: After successful signin we have to redirect the user to the secured page. We will do that later.

    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
      ...
      ...
    </form>
  );
};

export default SigninForm;
```
Here, when the form is submitted, the `handleSubmit` function is called, which makes a POST request to the `/api/signin` endpoint with the email and password from the form. If the request is successful, the function logs a message to the console, and redirects the user to the `/dashboard` path using the `history` object from `react-router-dom`. If the request fails, an error message is logged to the console.

Next, we've to add this form in our Signin page, and that's pretty much straight-forward.
```tsx
import React, { useState } from 'react';
// Dialogue 1: Just import the file
import SigninForm from "./SigninForm"

const Signin: React.FC<> = () => {
  // Dialogue 2: And use it after the h2 tag
  return (
    <div>
      <h1>Sign in</h1>
      <SigninForm />
    </div>
  );
}
export default Signin;
```
Finally, we are all set to test the signin page.
> Action: Open the app in browser and try to signin, keep browser console opened.

So, as we can see, after filling the form, once we hit the submit button, the `POST /users/sign_in` endpoint is getting called, and we are getting a successful response.
Now if you would observe the response payload, we are getting a `token` back here as well. 

Now there are two things to take care of:
1. We have to store thin `token` in browser, in order to make API calls to secured endpoints.
2. After successful signin, we've to redirect the users to their dashboard or projects page.

We will do that it later.

So, that's it for this lesson, see you in the next one.
