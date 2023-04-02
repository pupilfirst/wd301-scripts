# Script
Hey there! In this lesson you will learn to create a **user signin** form in React. We'll be using `async/await` to make an API call to authenticate the user, and **React Router** to redirect the user after successful sign-in.

So let's get started.

First, we will create a new `SigninForm` component for the signin form, inside the `src` folder:

> Action: creater SigninForm.tsx in `src` directory.

Next, we will design the Signin form, and I'll add event handlers to store the form field values like: email and password in local state:
```tsx
import React, { useState } from 'react';

const SigninForm: React.FC<> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Sign In</h1>
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
    </div>
  );
};

export default SigninForm;
```

Then, we will add event handler for form submission, and I'll also make the API call from there:

```tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SigninForm: React.FC<> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');

      // Redirect the user to the dashboard after successful sign-in
      history.push('/dashboard');
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default SigninForm;
```
Here, when the form is submitted, the `handleSubmit` function is called, which makes a POST request to the `/api/signin` endpoint with the email and password from the form. If the request is successful, the function logs a message to the console, and redirects the user to the `/dashboard` path using the `history` object from `react-router-dom`. If the request fails, an error message is logged to the console.

Next, we have to add this Signin Form to a parent component which we will render for the Signin path.

So, that's it for this lesson, see you in the next one.