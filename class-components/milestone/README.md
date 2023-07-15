> **Important Notes:**
>
> 1. You must format the code using `prettier` before submitting.
> 2. You must read the problem description carefully before making your submission. Do not miss the details - the program should perfectly match the specifications.
> 3. Take your time, sweat the details, and make every submission count!

## Problem Description

To complete this milestone, you have to add the following features to your `smarter-tasks` app.

- Add another input field to accept a description of a task. The field should have its `id` as `todoDescription`
- Add another input field to accept due date for a task. The field should have its `id` as `todoDueDate`
- Title input field should have `todoTitle` as its `id`.
- User should not be able to create empty tasks, i.e., tasks without title or due date. Description can be empty.
- Each task rendered should have `TaskItem` CSS class.

```html
<div>
  <div class="TaskItem">
    <h3>Sample item (2023-01-09)</h3>
    some description
  </div>
  <div class="TaskItem">
    <h3>Another item (2023-01-08)</h3>
    another description
  </div>
</div>
```

## Repo structure

At this point in the course, this is how your repo should be structured:

```
.
├── hello-react
├── smarter-tasks
|   ├── public
|   ├── src
|   |   ├── App.tsx
|   |   ├── index.css
|   |   ├── main.tsx
|   |   ├── Task.tsx
|   |   ├── TaskApp.tsx
|   |   ├── TaskCard.css
|   |   ├── TaskCard.tsx
|   |   ├── TaskForm.tsx
|   |   ├── TaskList.tsx
|   |   └── types.ts
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.js
└── .gitignore

```
Note that there may be other files in the repo apart from the ones we have listed above, and that's fine. 

## Submission Guidelines

Please attach a link to your deployed application.
