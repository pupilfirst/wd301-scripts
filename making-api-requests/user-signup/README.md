# Text

### About the folder structure
Maintaining an organized and optimized folder structure is crucial in building scalable and maintainable React application. 

Before we start defining the folder structure, we need to understand the concept of "Pages".

A "Page" is a self-contained section of the application that is represented by a URL. Examples of pages include "Home", "About", "Signin", "Account" etc.

Now that we understand the concept of "Page", we can define a folder structure for our React application. We can structure our application based on pages to keep it an organized.

Here's an example folder structure:

```
src/
|-- config/
|   |-- index.ts
|-- assets/
|-- pages/
|   |-- home/
|   |   |-- Home.tsx
|   |   |-- HomeComponent1.tsx
|   |   |-- HomeComponent2.tsx
|   |   |-- index.tsx
|   |-- signin/
|   |   |-- SigninForm.tsx
|   |   |-- index.tsx
|   |-- signup/
|   |   |-- SignupForm.tsx
|   |   |-- index.tsx
|   |-- shared/
|   |   |-- TextField.tsx
|   |   |-- Dialog.tsx
|-- services/
|   |-- api.ts
|   |-- authService.ts
|-- utils/
|   |-- commonUtils.ts
|   |-- dateUtils.ts
|-- App.tsx
|-- index.tsx

```

In this folder structure:

- The `config` folder contains all configuration values related to our application, for example: API endpoints and secret credentials as constants.
- The `assets` folder contains static assets such as images and fonts.
- The `pages` folder contains the pages of the application, and each page has its own folder. Every page folder contains a common `index.tsx` file, which is responsible for managing UI or layout of that specific page. The component inside the `index.tsx` file may require child components to compose the whole UI.
- The `pages/shared` folder contains all of those components which can be shared among other pages. For example: TextField, Dialog, Progressbar etc.
- The `services` folder contains services such as API services and authentication services.
- The `utils` folder contains utility functions that are used across the application.
- The `App.tsx` file is the main entry point for the application, and the `index.tsx` file is the entry point for the React application.

This folder structure will give us the following benefits:

- It will makes it easier to find and manage files.
- It will improves the readability of the code.
- It will encourage separation of concerns.

# Script
In this video, we are going to create a user signup form. So, when someone new comes to our Smarter Tasks (PMS) app, they should see a link to signup. When we click on the signup link, we should take them to the signup form, where they have to fill some details like:  organisation name, his/her name,  email and password. Then, when they click on the signup button, it should call our API service to create the user account. Let's start.

First, we will start with adding the route for the signup page. For that, I'll create a new folder `signup` inside the `pages` directory.
> Action: Create a new folder called `signup` inside the `pages` directory.

Then, inside the signup `folder` I'll add a new file called `index.tsx` with the following content:
```tsx
import React from 'react';

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
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NotFound from "./NotFound";
import Signup from './pages/signup';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}

export default App;

```
So, we've cleaned up all the routes that `App` component had previously, and only added the `signup` route. Now, let's go back to the browser to check if Signup page is coming or not.

> Action: Open http://localhost:3000 in browser and show the signup page.

Great! the signup page is coming, now let's create the signup form. For that, I'll create a new file SignupForm.tsx inside the `/src/pages/signup` folder.

> Action: Create SignupForm.tsx inside `/src/pages/signup` directory

```tsx
import React from 'react';

const SignupForm: React.FC = () => {
  return (
    <form>
      <input name="organisationName" name="organisationName" id="organisationName" type="text" />
      <input name="userName" name="userName" id="userName" type="text" />
      <input name="userEmail" name="userEmail" id="userEmail" type="email" />
      <input name="userPassword" name="userPassword" id="userPassword" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
export default SignupForm;
```

Next, we've to add this form in our Signup page, and that's pretty much straight-forward.
> Action: Open pages/signup/index.tsx and import SignupForm.tsx

```tsx
import React from 'react';
// Dialogue 1: Just import the file
import SignupForm from "./SignupForm"

const Signup: React.FC<> = () => {
  // Dialogue 2: And use it after the h2 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign up</h1>
        <SignupForm />
      </div>
    </div>
  );
}
export default Signup;
```

Next, I'll add event handlers to store the form field values in our component's state:
```tsx
import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Organisation Name:</label>
        <input type="text" name="organisationName" id="organisationName" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
        <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign up</button>
    </form>
  );
};

export default SignupForm;
```
As you can see, I;ve also used some CSS classes from Tailwind to style our form. Now our form is ready and we can submit the form data to the `Create Organisation` API endpoint.

```tsx
import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://wd301-api.onrender.com/organisations', {
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
Here, when the form is submitted, the `handleSubmit` function is called, which makes a POST request to the `/organisations` endpoint with the `organisationName`, `userName`, `userEmail` and `userPassword`. If the signup request gets processed in server successfully, the function logs a message to the console. If the request fails, an error message is logged to the console as well.

Now, there is a scope of small re-fractoring, i.e. the API endpoint https://wd301-api.onrender.com is going to be used multiple times throughout our application. So in multiple components we've to write this URL, and if the URL changes (for some reason), then we've to update each and every component to reflect this change. Instead of that, we can simply store it as a constant in our `src/config` folder. So, let's do that.

I'll create a `src/config/constants.ts` file, and add the following content there:
```ts
export const API_ENDPOINT = "https://wd301-api.onrender.com"
```

Then I'll import this constant in our `SignupForm` component:
```tsx
import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
...
...
```

Then I'll use this constant in the `handleSubmit` method:
```tsx
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/organisations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organisation: { name: organisationName, user_name: userName, user_email: userEmail, user_password: userPassword} }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }
      console.log('Sign-up successful');
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };
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
