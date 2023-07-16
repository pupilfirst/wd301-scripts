**To complete this level**: You have to create a Notfound page to catch all instances of wrong path navigation and provide a way to return back to the Homepage. You also have to make sure the always visible component is not available on the Notfound page.

## Requirements

- You have to create a new page/component called the `NotFound`
- The component should be available at the route `\notfound`
- When any invalid route is accessed in the application eg., `\temp` it should redirect back to `\notfound` page.
- The `\notfound` route should have a 404 message and a button to redirect back to the Homepage.
- The always available component (Header) that we created in the level should not be visible on the `\notfound` route.

Additionally, make sure to format your code using `Prettier` and use `ESLint` to enforce code standards.

## Repo structure

At this point in the course, this is how your repo should be structured:

```
.
├── hello-react
├── smarter-tasks
|   ├── public
|   ├── src
|   |   ├── hooks
|   |       └── useLocalStorage.ts
|   |   ├── App.tsx
|   |   ├── Header.tsx
|   |   ├── HomePage.tsx
|   |   ├── index.tsx
|   |   ├── NotFound.tsx
|   |   ├── ProtectedRoute.tsx
|   |   ├── Signin.tsx
|   |   ├── Task.tsx
|   |   ├── TaskApp.tsx
|   |   ├── TaskCard.css
|   |   ├── TaskDetailsPage.tsx
|   |   ├── TaskList.tsx
|   |   └── TaskForm.tsx
│   ├── package.json
│   └── package-lock.json
└── .gitignore
```
Note that there may be other files in the repo apart from the ones we have listed above, and that's fine. 

## Submission Guidelines

Please attach a link to your deployed application and your GitHub repository.