# Text

## Problem Description
To complete this milestone, you have to make the following changes in the *Smarter Tasks (PMS)* React application:
1. Once a user completes the signup and signin process, redirect the user to `/dashboard` path. You can use `useNavigate` hook from `react-router-dom` implement this feature.
2. In the dashboard page, access logged-in user's information from localStorage and print the name and email ID.
3. In the dashboard page, provide a link to logout from the account. The logout link should have the `id` attribute with `logout-link` as it's value. To successfully logout, you have to clear the session and current user's information from local storage.

### Repo structure
At this point in the course, this is how your repo should be structured:
```
├── hello-react
├── smarter-tasks
|   ├── public
|   ├── src
|   |   ├── hooks
|   |   |   └── useLocalStorage.ts
|   |   ├── config
|   |   |   └── constants.ts
|   |   ├── pages
|   |   |   ├── dashboard/
|   |   |   |   └── index.tsx
|   |   |   ├── signin/
|   |   |   |   ├── index.tsx
|   |   |   |   └── SigninForm.tsx
|   |   |   ├── signup/
|   |   |   |   ├── index.tsx
|   |   |   |   └── SignupForm.tsx
|   |   |   |── Notfound.tsx
|   |   |   └── shared/
|   |   |── App.tsx
|   |   ├── index.css
|   |   ├── main.tsx
|   |   └── ProtectedRoute.tsx
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
## Submission Requirements
1. After the implementation, commit your changes, and push the code to the GitHub repository.

#### Well-formatted code is a must.
Remember to format the code - keep proper indentation and add relevant comments if required. This one is non-negotiable as always.

Have fun!