# Text

In this lesson, we will add capability to create a task under a project.

Let's open `src/pages/project_details/ProjectDetails.tsx` in VS Code.

We will add a `button` wrapped in `Link` to navigate to `tasks/new` url, so that we can render a modal window. The button should have `newTaskBtn` as it's `id`.

```tsx
import { Link, useParams } from "react-router-dom";


const ProjectDetails = () => {
  const { projects } = useContext(ProjectContext);
  let { projectID } = useParams();
  const selectedProject = projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];
  if (!selectedProject) {
    return <>No such Project!</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject?.name}
        </h2>
         <Link to={`tasks/new`}>
          <button id="newTaskBtn" className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            New Task
          </button>
        </Link>
    </>
  );
};
```

Save the file. 

Now if you visit the project details page, you will see a `New Task` button. If you click on it, it will take you to `/accounts/project/:projectID/tasks/new` route.

Next, we will render a modal window, which will accept `title`, `description`, `dueDate` and `assignee` from user and then create a task.
