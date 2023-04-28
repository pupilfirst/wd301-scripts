# Script
In this lesson you will learn to submit a form data to an API in React, using async and await. 

So, we'll go over how to create a form in React, how to handle form submission, and how to make an API call with the form data.

First, we will open our project in VS Code editor.

Now, let's create a new component to display the `Form` in the `src` directory. 
> Action: Create a new file called `Form.tsx` in the `src` directory and add the following code:

So first we will design the form:
```tsx
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
```

Next, we will add event handlers with all input fields to get the updated value in `formData` state. The updated code will look this:

```tsx
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange} />

      <button type="submit">Submit</button>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Message: {formData.message}</li>
      </ul>
    </form>
  );
};

export default Form;
```
So, here we've added a `handleChange` method to get values from each input fields, then we are using `setFormData` function to update the `formData` object. After we submit button, I've printed the `formData` values just for testing purpose, you can remove it later. 

Next, let's import the `Form` component in our `App.tsx` file. 
```jsx
import React from 'react';
...
...
import Form from './Form';
...
...

function App() {
  return (
    <div>
      {isHeaderVisible && <Header />}
      <Form />
      <Routes>
        ...
        ...
      </Routes>
    </div>
  );
}

export default App;
```

Now, let's go to the browser to test it out.

> Action: Test the show if the form value is getting updated in local state and it's showing in webpage once we will the form fields.

Now, we are all set to submit our form. Let's implement the `handleSubmit` function and submit the form data to API endpoint.

```tsx
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange} />

      <button type="submit">Submit</button>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Message: {formData.message}</li>
      </ul>
    </form>
  );
};

export default Form;
```

In the `handleSubmit` function, we're making a POST request to the JSONPlaceholder API with the form data using `fetch()`. We're using `async` and `await` to handle the response from the API.

So, we are all set to test it out. Let's open http://localhost:3000 in browser.
> Action: Submit the form and Show the output on browser. Also keep network tab open to show the POST API call.

As, as you can see, the form data is successfully getting submitted to the API endpoint. And in response we are getting the new post object.

So, that's it for this lesson, see you in the next one.