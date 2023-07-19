**To complete this level**: You have to create a Notfound page to catch all instances of wrong path navigation and provide a way to return back to the Homepage. You also have to make sure the always visible component is not available on the Notfound page.

## Requirements

- You have to create a new page called the `NotFound`
- The component should be available at the route `/notfound`
- When any invalid route is accessed in the application eg., `/temp` it should redirect back to `/notfound` page.
- The `/notfound` route should have a 404 message and a button to redirect back to the Homepage.
- The always available component like Header, should not be visible on the `/notfound` route.

Additionally, make sure to format your code using `Prettier` and use `ESLint` to enforce code standards.

## Repo structure

At this point in the course, this is how your repo should be structured:
```
.
├── hello-react
├── smarter-tasks
|   ├── public
|   ├── src
|   |   ├── assets
|   |   ├── components
|   |   ├── hooks
|   |   |   └── useLocalStorage.ts
|   |   ├── pages
|   |   |   ├── HomePage.tsx
|   |   |   ├── Notfound.tsx
|   |   |   ├── TaskDetailsPage.tsx
|   |   |   └── TaskListPage.tsx
|   |   ├── App.tsx
|   |   ├── index.css
|   |   ├── Layout.tsx
|   |   ├── main.tsx
|   |   ├── ProtectedRoute.tsx
|   |   ├── Signin.tsx
|   |   ├── Task.tsx
|   |   ├── TaskApp.tsx
|   |   ├── TaskCard.css
|   |   ├── TaskCard.tsx
|   |   ├── TaskForm.tsx
|   |   ├── TaskList.tsx
|   |   └── types.ts
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.js
└── .gitignore
```
Note that there may be other files in the repo apart from the ones we have listed above, and that's fine. 

## Submission Guidelines

Please attach a link to your deployed application and your GitHub repository.