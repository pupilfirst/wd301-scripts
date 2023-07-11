# Text
In this lesson, we're going to take a slight detour from our current application flow and explore a different topic: **managing forms**. Get ready to discover a new approach to form management.

# Script
Forms are an essential part of web applications, allowing users to input and submit data. Till now, we've designed three forms in our Smarter Tasks application:
1. Signup form
2. Signin form
3. New project form

In all of these forms, we've used `useState` hook to save the input field value. And the overall implementation was quite easy and pretty much straight forward. But... there are some issues with this implementation:

1. **Performance issues:**
One of the primary concerns with managing form fields using `useState` is the performance impact. When we are using the `useState` hook to manage form inputs, every keystroke or input change triggers a re-render of the component. This behaviour can be problematic, particularly in larger forms or components with complex rendering logic.

2. **Cluttered state:**
When managing form fields individually with `useState`, each field requires its own state variable and corresponding setter function. As the number of form fields increases, the component's state can become cluttered with numerous state variables and setters, making the code more difficult to manage and maintain.

3. **Manual Validation and Error Handling:**
With useState, validating and handling form errors typically require additional code and logic. Since form fields are managed individually, it becomes the developer's responsibility to implement and maintain the validation and error handling logic for each field. This manual approach can be error-prone and time-consuming, especially for forms with complex validation requirements.


### Available solutions
To address the limitations and issues associated with managing form fields using `useState`, the React community have developed some very useful libraries to handle forms, effortlessly:

1. [React Hook Form](https://react-hook-form.com/):
> Action: open the [URL](https://react-hook-form.com/) in browser
React Hook Form is a powerful library specifically designed for form management in React. It offers features like automatic form validation, error handling, and centralized form state management. By adopting React Hook Form, you can simplify form handling, reduce unnecessary re-renders, and streamline error management.

2. [Formik](https://formik.org/):
Formik is another popular form management library for React. It provides an intuitive API for handling form fields, validation, and submission. Formik offers features like field-level validation, error tracking, and easy integration with third-party validation libraries. It helps in centralizing form state management and reduces boilerplate code.

And in this lesson, we will explore how to upgrade a basic React form using **react-hook-form**. So lets get started.

### Install [React Hook Form](https://react-hook-form.com/):
So, to install [React Hook Form](https://react-hook-form.com/), we will go back to the terminal and run the following command:
```sh
npm install react-hook-form --save
```
> Action: Run `npm install react-hook-form --save` in terminal.

### Upgrade New Project form to use `react-hook-form`
In this lesson, we will upgrade our **New Project** form to use the `react-hook-form` library.

1. **Step 1:**
So in the `NewProject` component (i.e. `src/pages/projects/NewProject.tsx`), we will import `react-hook-form`
```tsx
// src/pages/projects/NewProject.tsx

import { useForm, SubmitHandler } from "react-hook-form";
// ...
```

2. **Step 2:**
Next, we will define a new TypeScript `type` for Input fields:
```tsx
// src/pages/projects/NewProject.tsx

type Inputs = {
  name: string
};
```

3. **Step 3:**
Next, we will initialize the form using the `useForm()` hook.
```tsx
// src/pages/projects/NewProject.tsx

const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
```
Here, we're destructuring the `useForm()` hook to access various properties and functions. 
- The "register" function is used to register form fields.
- "handleSubmit" handles form submission.
- And "errors" tracks form validation errors.

4. **Step 4:**
Next we will update the input fields and we will replace the `value` and `onChange` attributes of the input fields with the `register` function.
```tsx
<input
  type="text"
  placeholder='Enter project name...'
  autoFocus
  {...register('name')}
  className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue`}
/>
```
Here, we are spreading the register function with the field name as an argument. This automatically registers the input field with react-hook-form, allowing it to handle validation and other features.

5. **Step 5:**
Next, we will add validation for our input fields. In our **New Project** form, the `name` field is a mandatory field. So we will configure it to, `{ required: true }`.
```tsx
<input
  type="text"
  placeholder='Enter project name...'
  autoFocus
  {...register('name', { required: true })}
  className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
    errors.name ? 'border-red-500' : ''
  }`}
/>
{errors.name && <span>This field is required</span>}
```
Here we've also added a error indicator. So whenever there would be an error related to name field, the `name` field border color would turn into red, and it will show the error message just after the field.

6. **Step 6:**
Next, we will update the <form> element to use the `handleSubmit` function from react-hook-form:
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  ...
  ...
</form>
```

Then we will rename the previously defined `handleSubmit` function with the new name `onSubmit`. It's bit confusing as previously we had a `handleSubmit` function from where we were managing the API call to create new project. But that name is having conflict the built-in `handleSubmit` function of react-hook-form.
```tsx
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Dialogue 1: > ACTION: Remove event.PreventDefault()

    // Dialogue 2: Next, we will destructure the data object to access name field value
    const { name } = data

    // Dialogue 3: And the rest of the code remains same..
  }
```

Ok, now let's check if everything is working properly or not.
> Action: open localhost:3000 in browser and create a new project.

And our form is working properly, as expected.

So to summarize, by upgrading our basic React form with `react-hook-form`, we have enhanced its functionality and improved user experience. `react-hook-form` simplifies form management, including form validation, error handling, and form submission. It provides a cleaner and more structured approach to handling forms in React applications. With the steps outlined in this lesson, you can easily upgrade the rest of forms present in our Smarter Tasks app, to leverage the benefits offered by `react-hook-form`. 

I leave that task to you.

So, that's it for this lesson, see you in the next one.