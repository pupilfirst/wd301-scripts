# Text

In this lesson, we will replace class based components with function based component. We will also make use of `useState` hook to create the state variables.

# Script

In this video, we will change or refactor our class based components to function based component. And to hold state in a function based components, we will use _React Hooks_.

Let's open our project in VS Code.

> Action: Switch to VS Code adn switch to `app.js`. Split the editor to show `TaskList.tsx`

We already have a function based component in our project. The `App` component is just a function. We can see how much simpler it is compared to `TaskList.tsx`, which is a class based component.

Now let's start our refactoring.

> Action: Open `Task.tsx`

We will begin with the `Task` component. This component is very straight forward and doesn't hold any state. It just render based on the `props` that are passed into it. We will create a new component, then finally once it is complete, we will delete the class based component.

So, let's create a new constant, `TaskFC`, short for functional component.

```tsx
const TaskFC = (props: TaskItem) => {};
```

Here, the component takes in a single argument, the `props` which is of type `TaskItem`, the same we had in class based component.

Now, let's copy the content from `render` function and paste it in our new component.

> Action: Copy the `jsx` content from `render` function to new component.

```tsx
return (
  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <li className="mt-5 sm:mt-0" style={{ listStyleType: "none" }}>
        <h2 className="text-lg font-bold text-gray-900">
          {this.props.title}
          <span className="pl-3 text-xs text-gray-400">
            {this.props.dueDate}
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-700">{this.props.description}</p>
      </li>
    </div>
  </div>
);
```

A function based component has to return a react fragment or a JSX element. And here we are returning a valid JSX element.

Now, the editor is showing us some error. We don't need the `this` anymore. We can directly reference the `props` which is passed in as an argument. So let's remove `this`.

```tsx
const TaskFC = (props: TaskItem) => {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <li className="mt-5 sm:mt-0" style={{ listStyleType: "none" }}>
          <h2 className="text-lg font-bold text-gray-900">
            {props.title}
            <span className="pl-3 text-xs text-gray-400">{props.dueDate}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-700">{props.description}</p>
        </li>
      </div>
    </div>
  );
};
```

Now, let's delete the class based component and rename our function based component as `Task`.

> Action: Delete `Task` component, rename `TaskFC` to `Task`

Let's check if everything is working as before. Let's start our server if it is not running.

```shell
npm start
```

> Action: switch to browser, visit `http://localhost:3000/<basename>`

Let's try adding a task.

> Action: Add a title, description, date and submit.

The task got added and is being displayed correctly. So it is working.

Now, let's repeat this for all our class based components.

> Action: Switch to VS Code and open `TaskList.tsx`

We will do the same for `TaskList` component.

> Action: create a new component `TaskListFC` and copy contents from `render` function.

```tsx
const TaskListFC = (props: Props) => {
  return props.tasks.map((task, idx) => (
    <Task
      key={idx}
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
    />
  ));
};
```

Let's remove the old version and rename our new one as `TaskList`.

> Action: rename `TaskListFC` to `TaskList`.

```tsx
const TaskList = (props: Props) => {
  return props.tasks.map((task, idx) => (
    <Task
      key={idx}
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
    />
  ));
};
```

When we save, the browser shows an error, saying:

> 'TaskList' cannot be used as a JSX component.
> Its return type 'Element[]' is not a valid JSX element.

Like I said before, a function based component needs to return a JSX element or a fragment. We can do that by simply enclosing the value between curly braces.

```tsx
const TaskList = (props: Props) => {
  const list = props.tasks.map((task, idx) => (
    <Task
      key={idx}
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
    />
  ));
  return <>{list}</>;
};
```

`<></>` is short hand for a React fragment.

Save the file. Now, everything compiles without error.

> Action: Switch to `TaskForm.tsx`

Now, let's refactor `TaskForm.tsx`. This component holds some state. So we will be using `useState` hook to create state variables.

Let's create a new component as usual.

```tsx
const TaskFormFC = (props: TaskFormProps) => {};
```

Let's use the `useState` hook to create our state variables.

```tsx
const [formState, setFormState] = React.useState<TaskFormState>({
  title: "",
  description: "",
  dueDate: "",
});
```

We could have also create separate state variables for `title`, `description`, and `dueDate` like:

```tsx
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [sueDate, setDueDate] = React.useState("");
```

I wanted to show you, it is possible to use any object or array as a state.

Now, let's copy other functions which sets the state.

> Action: Copy setter functions

Now the editor shows lot of errors, but it is quiet simple. These were member variables in the class component. We just have to add `const` before them, so that it is declared in this function context. So let's do that.

> Action: Add `const` keyword before each block

Next, we will have to use the `setFormState` instead of `setTitle` and other setters.

```tsx
const titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  console.log(`${event.target.value}`);
  setFormState({ ...formState, title: event.target.value });
};
const descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (
  event
) => {
  console.log(`${event.target.value}`);
  setFormState({ ...formState, description: event.target.value });
};
const dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  console.log(`${event.target.value}`);
  setFormState({ ...formState, dueDate: event.target.value });
};
```

The setter in functional component, replaces the previous state. So, we will have to use the spread operator to preserve any other values. If we had used seperate setters for `title`, `description` etc, we could have simply invoked the setter.

Let's update the `addTask` function next. We can drop the `this.state` and use `formState`. Also we can directly invoke `props.addTask` rather than `this.props.addTask`.

```tsx
const addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  console.log(`Submitted the form with`);

  if (formState.title.length === 0 || formState.dueDate.length === 0) {
    return;
  }
  props.addTask(formState);
  setFormState({ title: "", description: "", dueDate: "" });
};
```

Finally, let's update the JSX element.

```tsx
return (
  <form onSubmit={addTask}>
    <div className="grid md:grid-cols-4 md:gap-3">
      <div className="relative z-0 w-full mb-6 group">
        <input
          id="todoTitle"
          name="todoTitle"
          type="text"
          value={formState.title}
          onChange={titleChanged}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="todoTitle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Todo Title
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          id="todoDescription"
          name="todoDescription"
          type="text"
          value={formState.description}
          onChange={descriptionChanged}
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />

        <label
          htmlFor="todoDescription"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          id="todoDueDate"
          name="todoDueDate"
          type="date"
          value={formState.dueDate}
          onChange={dueDateChanged}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="todoDueDate"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Due Date
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add item
        </button>
      </div>
    </div>
  </form>
);
```

> Action: rename `TaskFromFC` to `TaskForm` and remove old component.

Now, everything should work fine. Let's remove old component, rename new component as `TaskForm`. Save the file.

> Action: Switch to browsser and add a task
> Let's add a task. And everything is working fine.

Finally we only have one more component to be modified. Let's do that.

> Action: switch over to `TaskApp.tsx`

And make similar changes.

```tsx
const TaskApp = (props: TaskAppProp) => {
  const [taskAppState, setTaskAppState] = React.useState<TaskAppState>({
    tasks: [],
  });
  const addTask = (task: TaskItem) => {
    setTaskAppState({ tasks: [...taskAppState.tasks, task] });
  };
  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={taskAppState.tasks} />
    </div>
  );
};
```

So, we converted all our class based components to function based components. And made use of React Hooks to hold the state. One of the main rules of hook is that, it should be declared on top level of the component. You cannot declare it inside loops, conditions or nested functions. See you in the next lesson.

Reference:

[React Fragmment](https://reactjs.org/docs/fragments.html)
[Hook Rules](https://reactjs.org/docs/hooks-rules.html)