# Text

## Problem Description
To complete this milestone, you have to make the following changes in the *Smarter Tasks (PMS)* React application:
1. You have to implement the members page (i.e. /account/members) with the following features:
* As a logged-in user, one should be able to view a list of all members. Use the [`GET /users` API endpoint](https://wd301-api.pupilfirst.school/#/Users/get_users) to get the list of all users of an organisation.
* In the member listing page, for each member, **name** and **email ID** should be visible.
2. In the member listing page, there should be an option to create a new user with the following details: name, email and password. Use the [`POST /users` API endpoint](https://wd301-api.pupilfirst.school/#/Users/post_users) to create a new user for your organisation.  
* You have to open the new member form in a dialog, and then if the API endpoint responds back with any validation error, then show that message properly.
* After successfully creating the user, close the dialog and re-render the members list without refreshing the whole page.
3. In the member listing page, there should be an option to remove a user from an organisation. Use the [`DELETE /users/{id}` endpoint](https://wd301-api.pupilfirst.school/#/Users/delete_users__id_) to delete any user by ID.
* So, every member card, should be a delete icon button. On that button click delete the user and remove his/her card from the members listing page.
4. Update the signup and signin form components to use [React Hook Form](https://react-hook-form.com/), like we did in the new project form.
5. Define a `/notfound` route and page which would contain a 404 message.

### Repo structure
At this point in the course, this is how your repo should be structured:
```
├── hello-react
├── smarter-tasks
|   ├── public
|   ├── src
|   |   ├── assets
|   |   |   └── images/
|   |   |       └── logo.png
|   |   ├── config
|   |   |   └── constants.ts
|   |   ├── context
|   |   |   ├── members/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   ├── projects/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   └── theme.tsx
|   |   ├── hooks
|   |   |   └── useLocalStorage.ts
|   |   ├── layouts
|   |   |   ├── account/
|   |   |   |   ├── Appbar.tsx
|   |   |   |   └── index.tsx
|   |   ├── pages
|   |   |   ├── logout/
|   |   |   |   └── index.tsx
|   |   |   ├── members/
|   |   |   |   ├── index.tsx
|   |   |   |   ├── NewMember.tsx
|   |   |   |   ├── MemberList.tsx
|   |   |   |   └── MemberListItems.tsx
|   |   |   ├── projects/
|   |   |   |   ├── index.tsx
|   |   |   |   ├── NewProject.tsx
|   |   |   |   ├── ProjectList.tsx
|   |   |   |   └── ProjectListItems.tsx
|   |   |   ├── signin/
|   |   |   |   ├── index.tsx
|   |   |   |   └── SigninForm.tsx
|   |   |   ├── signup/
|   |   |   |   ├── index.tsx
|   |   |   |   └── SignupForm.tsx
|   |   |   ├── shared/
|   |   ├── routes
|   |   |   ├── index.tsx
|   |   |   └── ProtectedRoutes.tsx
|   |   |── App.tsx
|   |   ├── index.css
|   |   ├── main.tsx
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
1. To implement the members module, you can follow the implementation pattern of the projects module:
   * Design the basic UI components
   * Design the app-level state for members using Context and useReducer
   * Dispatch proper actions from components
   * Consume meaningful data from state
2. The "New Member" button should have this ID attribute: `new-member-btn`.
3. In the new member form, make sure the input fields have proper ID attributes. Like, the email field should have `email` ID, password should have `password` ID, name should have `name` as ID.
4. In members page, every member card should have a css clsss name: `member`. This will help us to identify each members cards and perform automated tests on it.
5. After the implementation, commit your changes, and push the code to the GitHub repository.

#### Well-formatted code is a must.
Remember to format the code - keep proper indentation and add relevant comments if required. This one is non-negotiable as always.

Have fun!
