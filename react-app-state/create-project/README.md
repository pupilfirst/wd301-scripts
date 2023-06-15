# Text
In the previous lesson, you've learned to list down all projects using the `useReducer` hook. But currently in our Smart Tasks app, we don't have an option to create a project. Last time when we tested the project listing page, then we created new projects using Postman REST client. So, let's implement this feature to create a new project.

# Script
In this lesson, we will create functional a user interface, to create new projects. 
So the plan is:
- In the project listing page, we will add a button called "New Project".
- On that button click, we will open a dialog.
- Then in the dialog, we will a form to create new project.

So, let's get started!

### Step 1: Create the `NewProject` component
First, we will create a file new `NewProject.tsx` inside the `src/pages/projects` folder
> Action: Create `src/pages/projects/NewProject.tsx` file

Then inside that file, we will create our `NewProject` component:
```tsx
const NewProject = () => {

  // Dialogue 1: Then from this component, we will return a simple button called "New Project"
  return (
    <button
      type="button"
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      New Project
    </button>
  )
}

export default NewProject;
```
### Step 2: Import & use the NewProject component in the project listing page.
Next, we will import the `NewProject` component inside the `src/pages/projects/index.tsx` file
```tsx
// ...
import NewProject from "./NewProject";
// ...
// ...
```

Then, we will use the `NewProject` component, and we will place the "New Project" button on the right hand side of page title "Projects".
```tsx
  // ...
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">Projects</h2>
        <NewProject />
      </div>
      <ProjectList />
    </>
  )
  // ...
```

Now, if we would go back to the browser
> Open http://localhost:3000/account/projects in browser
Yes! the button is coming.

### Step 3: Open a dialog on button click
Next, we will use [Dialog component from headlessUI](https://headlessui.com/react/dialog) to open a dialog on "New Project" button click.
```tsx
// src/pages/projects/NewProject.tsx

// Dialogue 1: First we will import Dialog and Transition component from '@headlessui/react'
import { Dialog, Transition } from '@headlessui/react'

// Dialogue 2: Next we will import Fragment and useState component from 'react'
import { Fragment, useState } from 'react'

const NewProject = () => {
  // Dialogue 4: Then we will use useState hook to handle local state for dialog component
  let [isOpen, setIsOpen] = useState(false)

  // Dialogue 5: Then we add the openModal function. If you don't know, Modal and Dialog are almost same thing.
  const openModal = () => {
    setIsOpen(true)
  }

  // Dialogue 6: Then we add the closeModal function
  const closeModal = () => {
    setIsOpen(false)
  }

  // Dialogue 3: Then in the return statement, we will use the code for modal (which we've obtained from this link: [Dialog](https://headlessui.com/react/dialog))
  return (
    <>
      <button
        type="button"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        New Project
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new project
                  </Dialog.Title>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>    
    </>
  )
}
// ...
```

And finally on button click event, we will call the `openModal` function
```tsx
return (
  <button
    type="button"
    onClick={openModal}
    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    New Project
  </button>
  // ...
)
```

Now, lets go back the the browser to check, whenever we click on the button, the dialog is opening or not.
> Open http://localhost:3000/account/projects in browser

Yes! the dialog is opening.

### Step 4: Let's create the "New Project" form
Next, we will design the form with only one field for project `name`.
```tsx
// src/pages/projects/NewProject.tsx

  // ...
  // ...
  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      Create new project
    </Dialog.Title>
    <div className="mt-2">
      <form>
        <input type="text" required placeholder='Enter project name...' autoFocus name="name" id="name" />
        <button type="submit">
          Submit
        </button>
        <button type="submit" onClick={closeModal} >
          Cancel
        </button>
      </form>
    </div>
  </Dialog.Panel>
```

Now, lets go back the the browser to check, if the form is coming or not.
> Open http://localhost:3000/account/projects in browser, and click new project button.

### Step 5: Add the event handler for input field.
Then, we have to add an event handler to get the input field value, on `onChange` event.
```tsx
// src/pages/projects/NewProject.tsx
// ...
// ...

// Dialogue 1: So first, we will define a local component state using useState hook to keep the name value.
const [name, setName] = useState('');

// ... Dialogue 2: Then, we will set the value of the input field to `name` local state. And on the onChange event of the text field, we will call the `setName` method, to set the text field value
<input type="text" required placeholder='Enter project name...' autoFocus name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
```

### Step 6: Handle form submission.
Next, we've to handle the `onSubmit` event of the form.
```tsx
// src/pages/projects/NewProject.tsx

// Dialogue 1: We will define a handleSubmit function to process form data on submission
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

  // Dialog 2: The event.preventDefault() will prevent the page to refresh on form submission
  event.preventDefault();
  console.log("Form submitted");
  console.log("Project name:", name);
}
// ...
// ...

// Dialogue 2: Then we will attach the `handleSubmit` method with the onSubmit event of the form
<form onSubmit={handleSubmit}>
...
...
</form>
```
Now, lets go back the the browser to check, whenever we wibmit the form, the form data is getting printed on the browser console or not.
> Open http://localhost:3000/account/projects in browser, open browser console, fill the input and click Submit button. The form data should get printed to console.

And yes! the project name is getting printed, whenever we submit the form.


### Step 7: Making the API call on form submit event, with form data.
Next, we've to make tha API call with form data, to create the new project. So, for that let's open the API doc first to check the request payload details:
> Action: open https://wd301-api.pupilfirst.school/#/Projects/post_projects in browser.

So, as you can see, we just have to pass the project name as part of the request body. And as this is a secured endpoint, in that case we've to pass the user token as `Authorization` header.
```tsx
// src/pages/projects/NewProject.tsx

// ...

// Dialogue 1: First, I'll import the `API_ENDPOINT` constant from the config folder
import { API_ENDPOINT } from '../../config/constants';

// ...
// ...

// Dialogue 2: Then, I'll upgrade the handleSubmit function as an async function, as we are going to make an API call from here.
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  // ...

  // Dialogue 4: Then, I'll obtain the token from local storage
  const token = localStorage.getItem("authToken") ?? "";

  // Dialogue 3: Next, I'll make a POST request using fetch, to the API endpoint
  const response = await fetch(`${API_ENDPOINT}/projects`, {
    method: 'POST',
    // Dialogue 5: And I'll pass the token as Bearer token in the Authorization header
    headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    // Dialogue 6: Finally I'll pass the project name, as name attribute (as per the API doc).
    body: JSON.stringify({ name: name }),
  });
}
```

Now to prevent any unexpected error, I'll wrap this API call with a `try-catch` block
```tsx
// src/pages/projects/NewProject.tsx

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name }),
      });

      // Dialogue 1: If response is not OK, in that case I'll throw an error.
      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // Dialogue 2: Next, I'll extract the response body as JSON data
      const data = await response.json();

      // Dialogue 3: Let's print the data in console
      console.log(data)
    } catch (error) {
      // Dialogue 4: And in catch block, I'll print the error in console.
      console.error('Operation failed:', error);
    }
  };
```
Now our `handleSubmit` method is almost ready, let's test it in browser.
> Action: open http://localhost:3000/account/projects in browser, and open browser console. Fill the data and submit the form. Show the browser console as the new project data will get printed there.

So, 
- After filling the form, once we submit,
- Yes, we've got a success response in network console.
- And the new project data is getting printed in the console.

And if we would refresh the page,
Yes! The new project is getting listed here.

Now we've to close the dialog, once we get a successful response on form submission.
```tsx
// src/pages/projects/NewProject.tsx

try {
  // Dialogue 1: For that, at the end of the try block, I'll call the `setIsOpen` function and set the value to `false` to close the modal.
  setIsOpen(false)
}
```

### Step 8: Fixing the UI
Now the form UI looks kind of basic, which we can improve using some TailwindCSS classes. Let's do that
```tsx
// src/pages/projects/NewProject.tsx

<form onSubmit={handleSubmit}>
  <input type="text" required placeholder='Enter project name...' autoFocus name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
    Submit
  </button>
  <button type="submit" onClick={closeModal} className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
    Cancel
  </button>
</form>
```

Let's go to the browser for one final check
> Action: open http://localhost:3000/account/projects in browser, and open the dialog and show the form.

Yes! this UI looks good. 

### Summarize
So, finally we've implemented the "Create Project" feature. 

But do you think this implementation is complete? Is everything working is expected?

Uhhh...

The answer is no. 

There is a small problem with our projects page right now. Have you noticed????

Let me explain.

In this page (means the projects page):
- We can see the list of projects
- We can open the dialog to create a new project
- We can fill the project name and submit the form
- And once we refresh the page the new project is coming in the list.
  - Wait.. what? We've to manually refresh the page to see the new project?
  - Do you think this is creating a good user experience?
    - No, Right?
    - The ideal UX should be,
      - Once we submit the form, if everything goes well on server side, the dialog should close automatically and the project list should get re-rendered automatically. Right? That is a better UX than what we have right now.
      - But if we would try to fix it, we will face a challenge, that is:
        - The `NewProject` and `ProjectList` are two separate components. Now, how do we pass the new project creation event or new project data from the `NewProject` component to the `ProjectList` component? In this case, local component state won't work as these two are separate components. 
        - So, we need something greater than local component level state.
        - We have to design a state which will work at top level, and using which we can communicate between components.
        - **We need an application level state.**
