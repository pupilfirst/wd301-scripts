# Script
Hey there! In this lesson you will learn to create a **user signin** form in React. We'll be using `async/await` to make an API call to authenticate the user, and **React Router** to redirect the user after successful sign-in.

So let's get started.

First, we will start with adding the route for the signin page. 

From now onwards, we will keep all of our components related to a specific page or route in a folder called **pages**, inside the src directory. So, let's create that folder:
> Action: Create `pages` folder inside src.

Next, we will create a `signin` folder inside the `pages` directory. We will create all components related ti signin page inside this folder.
> Action: Create a new folder called `signin` inside the `pages` directory.

Then, inside the signin `folder` I'll add a new file called `index.tsx` with the following content:
```tsx
import React from 'react';

// Dialogue 1: Let's define the Signin component
const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign in</h1>
      </div>
    </div>
  );
}

// Dialogue 3: And finally, we've to export the component
export default Signin;
```

Let's add this new `Signin` component in our `App` component, i.e., _App.tsx_ file.
```tsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from "./NotFound";
import Signup from './pages/signup';
// Dialogue 1: First, we've to import the Signin component
import Signin from './pages/signin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/signup" element={<Signup />} />
        { /* Dialogue 2: Then we will add route for signin path and render Signin page there */}
        <Route exact path="/signin" element={<Signin/>} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Switch>
    </Router>
  );
};
export default App;
```
Now, let's go back to the browser to check if Signin page is coming or not. For that, I'll open the following URL: http://localhost:3000/signin
> Action: Open browser and show the signin page.

Great! the signin page is coming, now let's create the signin form. For that, I'll create a new file `SigninForm.tsx`, inside the `/src/pages/signin` folder.

> Action: Create SigninForm.tsx inside `/src/pages/signin` directory

Here we will design the Signin form, and I'll add event handlers to store the form field values like: email and password in local state:
```tsx
import React, { useState } from 'react';

const SigninForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
    </form>
  );
};

export default SigninForm;
```

Next, we've to add this form in our Signin page (i.e. the *pages/signin/index.tsx* file), and that's pretty much straight-forward.
```tsx
import React from 'react';
// Dialogue 1: Just import the file
import SigninForm from "./SigninForm"

const Signin: React.FC<> = () => {
  // Dialogue 2: And use it after the h1 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign in</h1>
        <SigninForm />
      </div>
    </div>
  );
}
export default Signin;
```
Now, let's check the browser if Signin form is coming or not.
> Action: Open http://localhost:3000/signin in browser and show the signin form.

That's great, our form is coming.

Next, we will add event handler for form submission, and I'll also make the API call from there:

```tsx
import React, { useState } from 'react';
// Dialogue 1: First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from '../../config/constants';

const SigninForm: React.FC<> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dialogue 2: Then we will define the handle submit function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
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

  // Dialogue: Then we will use the handleSubmit function with our form
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
Here, when the form is submitted, the `handleSubmit` function is called, which makes a POST request to the `/users/sign_in` endpoint with the email and password from the form. If the request is successful, the function logs a message to the console, and if the request fails, an error message is also logged in the console.

Finally, we are all set to test the signin page.
> Action: Open the app in browser and try to signin, keep browser console opened.

So, as we can see, after filling the form, once we hit the submit button, the `POST /users/sign_in` endpoint is getting called, and we are getting a successful response.
Now if you would observe the response payload, we are getting a `token` back here as well. 

Now there are two things to take care of:
1. We have to store thin `token` in browser, in order to make API calls to secured endpoints.
2. After successful signin, we've to redirect the users to their dashboard or projects page.

We will do that it later.

So, that's it for this lesson, see you in the next one.
