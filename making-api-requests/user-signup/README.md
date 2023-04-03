# Script
In this video, we are going to create a user signup form. So, when someone new comes to our Smarter Tasks (PMS) app, they should see a link to signup. When we click on the signup link, we should take them to the signup form, where they have to fill some details like:  organisation name, his/her name,  email and password. Then, when they click on the signup button, it should call our API service to create the user account. Let's start.

First, we will start with adding the route for the signup page. For that, I'll create a new folder `signup` inside the `pages` directory.
> Action: Create a new folder called `signup` inside the `pages` directory.

Then, inside the signup `folder` I'll add a new file called `index.tsx` with the following content:
```tsx
import React, { useState } from 'react';

// Dialogue 1: Let's define the Signup component
const Signup: React.FC<> = () => {
  return (
    <div>
      { /* Dialogue 2: with a basic h1 tag, Sign up */}
      <h1>Sign up</h1>
    </div>
  );
}

// Dialogue 3: And finally, we've to export the component
export default Signup;
```

Let's add this new `Signup` component in our `App` component.
```tsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './pages/signup';
import { AuthProvider } from "./useAuth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};
export default App;
```
So, we've cleaned up all the routes that `App` component had previously, and only added the `signup` route. Now, let's go back to the browser to check if Signup page is coming or not.

> Action: Open browser and show the signup page.

Great! the signup page is coming, now let's create the signup form. For that, I'll create a new file SignupForm.tsx inside the `/src/pages/signup` folder.

> Action: Create SignupForm.tsx inside `/src/pages/signup` directory

```tsx
import React, { useState } from 'react';

const SignupForm: React.FC<> = () => {
  return (
    <form>
      <input name="organisationName" type="text" />
      <input name="userName" type="text" />
      <input name="userEmail" type="email" />
      <input name="userPassword" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
export default SignupForm;
```

Next, I'll add event handlers to store the form field values in our component's state:
```tsx
import React, { useState } from 'react';

const SignupForm: React.FC<> = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <form>
      <label>
        Organisation Name:
        <input type="text" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} />
      </label>
      <br />
      <label>
        Name:
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
```

Now our form is ready and we can submit the form data to the `Create Organisation` API endpoint.
```tsx
import React, { useState } from 'react';

const SignupForm: React.FC<> = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/organisations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organisation: { name: organisationName, user_name: userName, user_email: userEmail, user_password: userPassword} }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      console.log('Sign-up successful');

      // Dialogue: After successful signup we have to redirect the user to the secured page. We will do that later.
    } catch (error) {
      console.error('Sign-up failed:', error);
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

export default SignupForm;
```
Here, when the form is submitted, the `handleSubmit` function is called, which makes a POST request to the `/organisations` endpoint with the organisationName, user's name, email and password from the form. If the request is successful, the function logs a message to the console, and redirects the user to the `/dashboard` path using the `history` object from `react-router-dom`. If the request fails, an error message is logged to the console.

Next, we've to add this form in our Signup page, and that's pretty much straight-forward.
```tsx
import React, { useState } from 'react';
// Dialogue 1: Just import the file
import SignupForm from "./SignupForm"

const Signup: React.FC<> = () => {
  // Dialogue 2: And use it after the h2 tag
  return (
    <div>
      <h1>Sign up</h1>
      <SignupForm />
    </div>
  );
}
export default Signup;
```

Finally, we are all set to test the signup page.
> Action: Open the app in browser and try to signup, keep browser console opened.

So, as we can see, after filling the form, once we hit the submit button, the `POST /organisations` endpoint is getting called, and we are getting a successful response.
Now if you would observe the response payload, we are getting a `token` here. 

Now there are two things to take care of:
1. This `token` is very important as we have to use it to make API calls to secured endpoints. So we have to find a way to store the token in browser.
2. After successful signup, we've to redirect the users to their dashboard or projects page.

We will do that it later.

So, that's it for this lesson, see you in the next one.
