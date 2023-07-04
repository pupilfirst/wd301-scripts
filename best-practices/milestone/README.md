## Problem Description

To complete this milestone, you have to make the following changes in the _Smarter Tasks (PMS)_ React application:

1. You have to implement the React Suspense feature for the `ProjectDetails` and the `MemberList` Components:

2. You have to integrate the `ErrorBoundary` for both the components similar to the `ProjectList` component.

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

To Be Updated...

#### Well-formatted code is a must.

Remember to format the code - keep proper indentation and add relevant comments if required. This one is non-negotiable, as always.

Have fun!