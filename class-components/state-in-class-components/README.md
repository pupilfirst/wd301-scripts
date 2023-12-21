In this lesson, we will learn about state in class-based components. We will use state to hold a list of tasks and then render them as new tasks are added to it.

Let's go to our `smarter-tasks` react app and open VSCode using `code .`.

Let's first edit our `Task` component inside the `Task.tsx` file to accept a `title` property, so that, we can render different tasks.

Since we are using TypeScript, we will have to first create a type for the different properties this component can accept. We can use `interface` to do that. Let's create a `TaskProp` interface inside our `Task.tsx` file.

```ts
interface TaskProp {
  title: string;
}
```

Then, add it as the first generic parameter in the component definition. This is how we tell the TypeScript compiler to always check the `Task` component adheres to its definition.

```tsx
class Task extends React.Component<TaskProp> {
  render() {
    return <div>Buy groceries </div>;
  }
}
```

As soon as we add this, the compiler complains `Property 'title' is missing in type`. This is where TypeScript helps us in reducing the surprise bugs. It is asking us to provide `title` prop along with the `Task` component in the `App.tsx` file. To do this, we will go to `App.tsx` file and include `title` prop in that

```tsx
function App() {
  return (
    <div className="App">
      <Task title="Pay rent" />
    </div>
  );
}
```

Now, let's actually render this `title` prop, instead of hard-coded string in `Task.tsx`. Switch to `Task.tsx` file and update our earlier TaskProp.

```tsx
class Task extends React.Component<TaskProp> {
  render() {
    return <div>{this.props.title}</div>;
  }
}
```

Let's save the file. And visit `localhost:5173`. Now we can see the title being rendered, which is actually passed as a prop, i.e., `Pay rent`.

Now, let's create another component `TaskList.tsx`, which will hold all the task entries and then render each item using the `Task` component. To do this, we will create a new file `TaskList.tsx` under the `src` folder with the following code:

```tsx
import React from "react";
import Task from "./Task";

class TaskList extends React.Component {}

export default TaskList;
```

Now, let's import the `Task` component and use it to render a task. Let's cut the line from `App.tsx` and paste it in `TaskList.tsx`.

```tsx
class TaskList extends React.Component {
  render() {
    return <Task title="Pay rent" />;
  }
}
```

Then we will update `App.tsx` to use the `TaskList` component.

```tsx
import TaskList from "./TaskList";

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}
```

Everything is working like before.

Next, we will look at how we can use state in class-based components to display a list of tasks.

To do that, we will have to first create types for `props` and `state` for the `TaskList` component. Add the following code to the `TaskList.tsx` file.

```tsx
interface Props {}

interface TaskItem {
  title: string;
}
interface State {
  tasks: TaskItem[];
}
```

The state will have a key `tasks` which would be an array of `TaskItem`.

Let's now initialize a state in the constructor of `TaskList` component. When we write a constructor, we will have to call the `super` and pass the props. Also, TypeScript will complain if we don't set the type of `props` in the constructor.

```tsx
class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  render() {
    return <Task title="Pay rent" />;
  }
}
```

Now, rather than rendering a hardcoded value, let's render the tasks from state. To do that, let's add some initial value to the state.

```tsx
class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }],
    };
  }
  render() {
    <Task title="Pay rent" />;
  }
}
```

Now, let's use `map` and loop over the state and render tasks. The final code will look like this:

```tsx
class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }],
    };
  }
  render() {
    return (
      <>
        {this.state.tasks.map((task) => (
          <Task title={task.title} />
        ))}
      </>
    );
  }
}
```

Save the file and visit `localhost:5173`. You can see, the tasks got rendered correctly.
