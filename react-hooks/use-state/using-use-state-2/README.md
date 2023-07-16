# Text

In this lesson, we will continue replacing class based components with function based component.

Let's open our project, `smarter-tasks` in VS Code.

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
  <div className="TaskItem shadow-md border border-slate-100">
    <h2 className="text-base font-bold my-1">{this.props.title}</h2>
    <p className="text-sm text-slate-500">{this.props.dueDate}</p>
    <p className="text-sm text-slate-500">
      Description: {this.props.description}
    </p>
  </div>
);
```

A function based component has to return a react fragment or a JSX element. And here we are returning a valid JSX element.

Now, the editor is showing us some error. We don't need the `this` anymore. We can directly reference the `props` which is passed in as an argument. So let's remove `this`.

```tsx
const TaskFC = (props: TaskItem) => {
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <h2 className="text-base font-bold my-1">{props.title}</h2>
      <p className="text-sm text-slate-500">{props.dueDate}</p>
      <p className="text-sm text-slate-500">Description: {props.description}</p>
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

> Action: switch to browser, visit `http://localhost:5173/`

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

Same as before, a function based component needs to return a JSX element or a fragment. We can do that by simply enclosing the value between curly braces.

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

We only have one more component to be modified. Let's do that.

> Action: switch over to `TaskApp.tsx`

We can repeat the same steps as before and convert class based component to function based component.

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
