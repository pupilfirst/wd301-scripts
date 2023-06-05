# Text

Currently we can see the list of projects that are created. We will learn how to create a task under a project. First, we need to create a route for showing a modal window to create a task. We will also add placeholder routes for other features like listing tasks of a project, viewing details of a task etc.

Switch to VS Code and open `smarter-tasks/src/routes/index.tsx`.

We will first add a route to view detail view of a project. The URL patter we will use is: `/account/projects/:projectID`, where `:projectID` denotes the `id` of a project. Visiting `/account/projects/1` will render details of a project with `id` 1.

We will change following route

```tsx
{
  path: "projects",
  element: (<Projects />)
},
```

to be

```tsx
{
  path: "projects",
  children: [
    { index: true, element: <Projects /> },
    {
      path: ":projectID",
      element: <>Show project details <Outlet /></>,
    }
  ]
}
```

Here, we have added a nested route with url `:projectID` and will render a fragment with text `Show project details` when this url is visited. We will add an `Outlet` to render any nested components.

Similarly, we can create routes to render tasks details, creating a new task. So the `routes/index.tsx` will look like:

```tsx
{
  path: "projects",
  children: [
    { index: true, element: <Projects /> },
    {
      path: ":projectID",
      element: <>Show project details <Outlet /></>,
      children: [
        { index: true, element: <></> },
        {
          path: "tasks",
          children: [
            { index: true, element: <Navigate to="../" replace /> },
            { path: "new", element: <>Show Modal window to create a task</> },
            {
              path: ":taskID",
              children: [{ index: true, element: <>Show Task Details</> }],
            },
          ],
        },
      ],
    },
  ],
},
```

We do some route handling like making sure any visit to the url `/accounts/projects/:projectID/tasks` will be redirected to `/accounts/projects/:projectID/` because eventually the tasks will be displayed in the project detail page itself.

Save the file. Now try visiting `/accounts/projects/1/`.

You will see `Show project details` text being displayed.

If you visit `/accounts/projects/1/tasks/new`, you will see `Show Modal window to create a task` text along with `Show project details`. So later when we implement the modal window, it will be overlayed above the project detail content.

Instead if you visit `/accounts/projects/1/tasks/2`, you will see `Show Task Details` text being rendered. We will also display task details as a modal window over the project details.

See you in the next lesson.
