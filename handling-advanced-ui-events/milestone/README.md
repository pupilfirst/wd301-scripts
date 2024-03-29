# Problem Description

To complete this milestone, you have to make the following changes in the _Smarter Tasks (PMS)_ React application:

1. You have to implement the comment feature for a task:

- As a logged-in user, one should be able to view a list of comments in the task details page. Use the [`GET /projects/{project_id}/tasks/{task_id}/comments` API endpoint](https://wd301-api.pupilfirst.school/#/Tasks/get_projects__project_id__tasks__task_id__comments) to get the list of comments for a task.

- The comments of a task should be listed in chronologically reverse order based on timestamp.
- For each comment a class named `comment` should be added, so that, the automated tests can identify comments.

2. In the task detail page, there should be an option to create a new comment. Use the [`POST /projects/{project_id}/tasks/{task_id}/comments` API endpoint](https://wd301-api.pupilfirst.school/#/Tasks/post_projects__project_id__tasks__task_id__comments) to create a new comment for the task.

- The comment should have `Name` of the user who did the comment, formatted `timestamp` of when the comment was made against the task, and the actual `comment` itself.
- The `input` element to add the comment should have id `commentBox`.
- The submit button to add a new comment should have the id `addCommentBtn`.

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
|   |   |   ├── comments/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   |   ├── types.ts
|   |   |   ├── members/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   ├── projects/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   ├── tasks/
|   |   |   |   ├── actions.ts
|   |   |   |   ├── context.tsx
|   |   |   |   └── reducer.ts
|   |   |   |   ├── types.ts
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
|   |   |   |   ├── MemberList.tsx
|   |   |   |   ├── MemberListItems.tsx
|   |   |   |   ├── NewMember.tsx
|   |   |   ├── project_details/
|   |   |   |   ├── Column.tsx
|   |   |   |   ├── DragDropList.tsx
|   |   |   |   ├── index.tsx
|   |   |   |   └── ProjectDetails.tsx
|   |   |   |   └── Task.tsx
|   |   |   |   └── TaskCard.css
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
|   |   |   ├── tasks/
|   |   |   |   ├── NewTask.tsx
|   |   |   |   ├── TaskDetails.tsx
|   |   |   |   ├── TaskDetailsContainer.tsx
|   |   |   ├── shared/
|   |   ├── routes
|   |   |   ├── index.tsx
|   |   |   └── ProtectedRoutes.tsx
|   |   |── App.tsx
|   |   ├── index.css
|   |   └── main.tsx
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

1. To implement the comments module, you can follow the implementation pattern of the task module:

   - Design the basic UI components
   - Design the component-level state for comments using Context and useReducer
   - Dispatch proper actions from components
   - Consume meaningful data from state

2. In task details page, every comment card should have a css clsss name: `comment`. This will help us to identify each comment cards and perform automated tests.
3. After the implementation, commit your changes, and push the code to the GitHub repository.
4. When creating a new project, the input field should have `name` attribute with the value `name`.
5. While creating a project, the submit button should have `id` as `submitNewProjectBtn`.
6. In the page to create a task, the input fields should have the `name` attribute as `title`, `description`, `dueDate`.
7. The submit button to create a task should have the id `newTaskSubmitBtn`

#### Well-formatted code is a must.

Remember to format the code - keep proper indentation and add relevant comments if required. This one is non-negotiable as always.

Have fun!
