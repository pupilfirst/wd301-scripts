# Script

In this video, we will learn about state in class based components. We will use state to hold a list of tasks and then render them as new tasks are added to it.

> Action: Switch to VSCode, and load the `smarter-tasks` react app.

Let's first edit our `Task` component to accept a `title` property, so that, we can render different tasks.

> Action: open `Task.tsx`

Since we are using TypeScript, we will have to first create a type for the different properties this component can accept. We can use `interface` to do that.

> Action: create `TaskProp` interface

```ts
interface TaskProp {
  title: string;
}
```

Then, add it as the first generic parameter in the component definition. This is how we tell TypeScript compiler to always check the `Task` component adheres to it's definition.

```tsx
class Task extends React.Component<TaskProp> {
  render() {
    return (
      <div>Buy groceries </div>
    )
  }
}
```

As soon as I add this, the compiler complains `Property 'title' is missing in type`. This is where TypeScript helps us in reducing the surprise bugs. It is asking us to provide `title` prop along with the `Task` component in the `App.tsx` file.

Let's do that.

> Action: edit `App.tsx` to include `title` prop

```tsx
function App() {
  return (
    <div className="App">
      <Task title='Pay rent'/>
    </div>
  );
}
```

Now, let's actually render this `title` prop, instead of hard coded string in `Task.tsx`.

> Action: switch to `Task.tsx`

```tsx
class Task extends React.Component<TaskProp> {
  render() {
    return (
      <div>{this.props.title}</div>
    )
  }
}
```

Let's save the file. And visit `localhost:5173`. Now we can see the title being rendered, which is actually passed as a prop.

Now, let's create another component `TaskList.tsx`, which will hold all the task entries and then render each item using `Task` component.

> Action: Create a file `TaskList.tsx`

```tsx
import React from "react";

class TaskList extends React.Component {
  
}

export default TaskList;
```

Now, let's import `Task` component and use it to render a task. Let's cut the line from `App.tsx` and paste it in `TaskList.tsx`.

```tsx
import React from "react";
import Task from "./Task"

class TaskList extends React.Component {
  render() {
    return (
      <Task title='Pay rent'/>
    )
  }
}
```

Then update `App.tsx` to use `TaskList` component.

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

Next, we will look how we can use state in class based components to display a list of tasks.

To do that, we will have to first create types for `props` and `state` for the `TaskList` component.

```tsx
interface Props {
}

interface TaskItem {
  title: string
}
interface State {
  tasks: TaskItem[];
}
```

The state will have a key `tasks` which would be an array of `TaskItem`.

Let's now initialize a state in the constructor of `TaskList` component. When we write constructor, we will have to call the `super` and pass the props. Also TypeScript will complain if we don't set the type of `props` in the constructor.

```tsx
class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: []
    }
  }
  render() {
    return (
      <Task title='Pay rent'/>
    )
  }
}
```

Now, rather than rendering a hardcoded value, let's render the tasks from state. To do that, let's ad some initial value to state.

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
      <Task title='Pay rent'/>
    );
  }
}
```

Now, let's use `map` and loop over the state and render tasks.

```tsx
class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }],
    };
  }
  render() {
    return this.state.tasks.map((task) => <Task title={task.title} />);
  }
}
```

Save the file and visit `localhost:5173`. You can see, the tasks got rendered correctly.
