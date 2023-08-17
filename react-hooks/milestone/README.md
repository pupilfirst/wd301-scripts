# Text

**To complete this level**: You have to persist items to localStorage and populate already saved items when reloading the page. You also have to add the capability to delete a task.

## Requirements

- You have to use a custom hook to store task items to `localStorage`
- Populate already saved items from `localStorage` when the page is loaded.
- Add the capability to delete a task. This should be done by adding a `<button>` for each task item. This button element should have the class `deleteTaskButton`.
- The submit button should have its `id` as `addTaskButton`.
- Each task should be listed using a `li` tag.


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
|   |   |   └── useLocalStorage.ts
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

Please attach a link to your deployed application and your GitHub repository.