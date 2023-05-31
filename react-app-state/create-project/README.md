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

  // Dialogue 5: Then we add the openModal function
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

Now, lets go back the the browser to check if, on button click the dialog is opening or not.
> Open http://localhost:3000/account/projects in browser

Yes! the dialog is opening.

### Step 4: Let's design the form
