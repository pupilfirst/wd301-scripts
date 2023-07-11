## Problem Description

To complete this milestone, you have to make the following changes in the _Smarter Tasks (PMS)_ React application:

1. You have to implement the React Suspense feature for the `ProjectDetails` and the `MemberList` Components:

2. You must integrate the `ErrorBoundary` for both components similar to the `ProjectList` component.

3. Make sure to update the Application to a PWA and ensure the Lighthouse Audit report is successful.
   
4. Create a final Production Application that meets all the Checklist items discussed in the previous lessons.

## Repo structure

At this point in the course, this is how your repo should be structured:

```
├── hello-react
├── smarter-tasks
├── README.md
├── generateReportFromResults.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── NotFound.tsx
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── config
│   │   └── constants.ts
│   ├── components
│   │   └── ErrorBoundary.jsx
│   ├── context
│   │   ├── comment
│   │   │   ├── actions.ts
│   │   │   ├── context.tsx
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── members
│   │   │   ├── actions.ts
│   │   │   ├── context.tsx
│   │   │   └── reducer.ts
│   │   ├── projects
│   │   │   ├── actions.ts
│   │   │   ├── context.tsx
│   │   │   └── reducer.ts
│   │   ├── task
│   │   │   ├── actions.ts
│   │   │   ├── context.tsx
│   │   │   ├── initialData.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   └── theme.tsx
│   ├── hooks
│   │   └── useLocalStorage.ts
│   ├── index.css
│   ├── index.tsx
│   ├── layouts
│   │   └── account
│   │       ├── Appbar.tsx
│   │       └── index.tsx
│   ├── logo.svg
│   ├── pages
│   │   ├── logout
│   │   │   └── index.tsx
│   │   ├── members
│   │   │   ├── MemberList.tsx
│   │   │   ├── MemberListItems.tsx
│   │   │   ├── NewMember.tsx
│   │   │   └── index.tsx
│   │   ├── project_details
│   │   │   ├── Column.tsx
│   │   │   ├── DragDropList.tsx
│   │   │   ├── ProjectDetails.tsx
│   │   │   ├── Task.tsx
│   │   │   ├── TaskCard.css
│   │   │   └── index.tsx
│   │   ├── projects
│   │   │   ├── NewProject.tsx
│   │   │   ├── ProjectContainer.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectListItems.tsx
│   │   │   └── index.tsx
│   │   ├── signin
│   │   │   ├── SigninForm.tsx
│   │   │   └── index.tsx
│   │   ├── signup
│   │   │   ├── SignupForm.tsx
│   │   │   └── index.tsx
│   │   └── tasks
│   │       ├── Comment.tsx
│   │       ├── NewTask.tsx
│   │       ├── TaskDetails.tsx
│   │       └── TaskDetailsContainer.tsx
│   ├── react-app-env.d.ts
│   ├── routes
│   │   ├── ProtectedRoute.tsx
│   │   └── index.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## Submission Requirements

After the implementation, commit your changes, and push the code to the GitHub repository.

Implement React Suspense to all the components as described.

Implement additional ErrorBoundary to all the components as described.

Build the solution on top of the existing solution from previous levels.

The application should be an installable PWA as described in the lessons.

Create a custom Icon for your application and implement the Manifest accordingly.

Implement necessary production checklist items that are taught in the course without fail.

#### Well-formatted code is a must.

Remember to format the code - keep the proper indentation and add relevant comments if required. This one is non-negotiable, as always.

Have fun!