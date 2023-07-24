# Text

In this lesson, we will add the capability to assign a task to a user.

Let's first open `src/pages/project_detils/Task.tsx` in VS Code.

Let's display assigned user's name in the task or render a `-` if the task is unasigned.

```tsx
<div>
  <h2 className="text-base font-bold my-1">{task.title}</h2>
  <p className="text-sm text-slate-500">
    {new Date(task.dueDate).toDateString()}
  </p>
  <p className="text-sm text-slate-500">Description: {task.description}</p>
  <p className="text-sm text-slate-500">
    Assignee: {task.assignedUserName ?? "-"}
  </p>
</div>
```

Save the file.

Next, we need to fetch the list of members of the organisation, when the project detail page is visited. Switch to `src/pages/project_details/index.tsx` file. And import the required functions.

```tsx
import { useMembersDispatch } from "../../context/members/context";
import { fetchMembers } from "../../context/members/actions";
```

Then we can dispatch the action in `useEffect`

```tsx
const ProjectDetailsContainer: React.FC = () => {
  let { projectID } = useParams();
  const projectDispatch = useProjectsDispatch();
  const memberDispatch = useMembersDispatch()
  useEffect(() => {
    fetchMembers(memberDispatch);
    if (projectID) fetchProject(projectDispatch, projectID);
  }, [projectID, projectDispatch, memberDispatch]);
  return (
      <TasksProvider>
          <ProjectDetails />
          <Outlet />
      </TasksProvider>
  );
};

export default ProjectDetailsContainer;
```

Now, the missing piece is to actually render a list from which a user can be assigned in the task detail view. We will make use of [`Listbox` component](https://headlessui.com/react/listbox) from headless UI.

Open `TaskDetails.tsx` in VS Code.

Import `Listbox` from headless UI.

```tsx
import { Dialog, Transition, Listbox } from "@headlessui/react";
```

Now, we will also import an icon to display which item is currently selected in a list.

```tsx
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
```

We will now update `TaskFormUpdatePayload` to hold assigned user as well. We can use the _union_ operation to combine two types.

```tsx
type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
};
```

Next, we need to get the list of members. We have a context which already provides it. So let's import it as well.

```tsx
import { useMembersState } from "../../context/members/context";
```

Let's use this hook to retrieve list of members.

```tsx
const memberState = useMembersState();
```

Next, we will add a state to track which member is currently selected for a task. We will assign an empty string if a task currently is unassigned. We will not use `react-hook-form` to render the user selection dropdown for simplicity.

```tsx
const [selectedPerson, setSelectedPerson] = useState(
  selectedTask.assignedUserName ?? ""
);
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<TaskFormUpdatePayload>({
  defaultValues: {
    title: selectedTask.title,
    description: selectedTask.description,
    selectedPerson: selectedTask.assignedUserName,
    dueDate: formatDateForPicker(selectedTask.dueDate),
  },
});
```

Now, we will use the `Listbox` component and render members as available options after the due date.

```tsx
  <input
    type="date"
    required
    placeholder="Enter due date"
    id="dueDate"
    {...register("dueDate", { required: true })}
    className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
  />
  <h3><strong>Assignee</strong></h3>
  <Listbox
    value={selectedPerson}
    onChange={setSelectedPerson}
  >
    <Listbox.Button className="w-full border rounded-md py-2 px-3 my-2 text-gray-700 text-base text-left">
      {selectedPerson}
    </Listbox.Button>
    <Listbox.Options className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {memberState?.members.map((person) => (
        <Listbox.Option
          key={person.id}
          className={({ active }) =>
            `relative cursor-default select-none py-2 pl-10 pr-4 ${
              active
                ? "bg-blue-100 text-blue-900"
                : "text-gray-900"
            }`
          }
          value={person.name}
        >
          {({ selected }) => (
            <>
              <span
                className={`block truncate ${
                  selected ? "font-medium" : "font-normal"
                }`}
              >
                {person.name}
              </span>
              {selected ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                  <CheckIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
```

Here, we invokes `setSelectedPerson` when we selects a value from the list.

One last piece is actually sending this user id back to server when we send the `PATCH` request. Let's do that as well.

We will find out member with the selected name, then use their `id` as `assignee` key in the payload. Here, we make use of `optional chaining`, to return `undefined`, whenever a matching entry doesn't exist.

```tsx
const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
  const assignee = memberState?.members?.filter(
    (member) => member.name === selectedPerson
  )?.[0];
  updateTask(taskDispatch, projectID ?? "", {
    ...selectedTask,
    ...data,
    assignee: assignee?.id,
  });
  closeModal();
};
```

Save the file. Now we should be able to see list of members in the organisation and assign a task to them.
