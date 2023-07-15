# Script

In this lesson, we are going to design a form which can be used to add tasks to our list.

First, we will create a component and name it `TaskForm`. This component will render an input field, where user can type the title. Then, on clicking the submit button, the entry will be appended to our list of tasks.

So, lets get started.

> Action: create a file named `TaskForm.tsx` and write following code

```tsx
import React from "react";

interface TaskFormProps {
  
}
interface TaskFormState {
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props);
  }

  render(){
    return (
      <div>Task form</div>
    )
  }
}

export default TaskForm;
```

We create an interface `TaskFormProps`, and `TaskFormState` to represent  props and state of the component. Both are empty for now.

Next, we need to render a HTML form. We can use the `<form>` tag for that.

> Action: Add following HTML form

```tsx
render(){
    return (
      <form>
        
      </form>
    )
  }
```

Now, let's add an input field. It will enable user to type a title for the task.

```tsx
render(){
    return (
      <form>
        <input type="text" />
      </form>
    )
  }
```

Let's save the file.

Next, we need to include this component in our `App.tsx` file.

> Action: Switch to `App.tsx` and update with following code.

```tsx
import React from 'react';
import './App.css';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  return (
    <div className="App">
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;

```

Here, we import the component, then use it to render just before our list of tasks.

Let's save the file. And visit `http://localhost:5173`

> Action: Switch to browser and visit the page `http://localhost:5173`

We can see, the input field is rendering fine. We can even type in it.

Next, let's extract out the task list into `App.tsx` component, and pass this list as props to `TaskList` component.

So we begin by editing `TaskList.tsx`, and adding a `tasks` entry of type `TaskItem[]` in the `Prop` interface. And let's remove it from `State` interface. We can also remove the constructor and `componentDidMount` method as we no longer set any state.

> Action: switch to `TaskList.tsx` and update with following code.

```tsx
import React from "react";
import Task from "./Task";

interface Props {
  tasks: TaskItem[];
}
interface TaskItem {
  title: string;
}
interface State {}

class TaskList extends React.Component<Props, State> {
  
  render() {
    return this.props.tasks.map((task, idx) => (
      <Task key={idx} title={task.title} />
    ));
  }
}

export default TaskList;

```

Now, let's move the `TaskItem` interface to another file called `types.ts`, which will hold all the common types or interfaces we use in our application.

> Action: create a file named `types.ts` and paste the `TaskItem` interface into it. We will also use `export` keyword to expose it to other files.

```ts
export interface TaskItem {
  title: string;
}
```

Let's import this type in our `TaskList` component. 

```tsx
import { TaskItem } from "./types";
```

Save the file. The TypeScript compiler now complains, we don't pass any props to `TaskList` component. Let's fix that.

Let's  pass an empty array for now.

> Action: switch to `App.tsx` and add the code

```tsx
<TaskList tasks={[]}/>
```

Save the file. Compiler is now happy.

Now, let's switch to `TaskForm.tsx` and add a button to submit the form.

> Action: Switch to `TaskForm.tsx` and add the following code.

```tsx
  render(){
    return (
      <form>
        <input type="text" />
        <button type="submit">Add item</button>
      </form>
    )
  }
```

Save the file. And if we visit `http://localhost:5173`, we can see the input field and submit button being rendered.

We can type in the input field and even submit the form. See you in the next lesson.

# Text

In this lesson, we will learn how to design a basic form using react.
