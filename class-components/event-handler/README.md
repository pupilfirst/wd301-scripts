# Script - part 1

In this lesson, you will learn how to handle form submissions.

We can handle a form submission by passing a submission handler as prop to the `<form>` element.

> Action: Add following code to `TaskForm.tsx`

```tsx
<form onSubmit={}>
  <input type="text" />
  <button type="submit">Add item</button>
</form>
```

If we hover over `onSubmit` prop, TypeScript compiler shows us the type of function it expects. Let's copy the type. And use it to annotate the submission handler.

> Action: copy `React.FormEventHandler<HTMLFormElement>` from VSCode intellisense.

Now, let's create our handler. Also let's override the default behaviour of browser submitting the form by invoking `preventDefault()` on the evet.

```tsx
addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  console.log("Submitted the form!");
};
```

Now, let's use this handler to handle form submission.

```tsx
  render(){
    return (
      <form onSubmit={this.addTask}>
        <input type="text" />
        <button type="submit">Add item</button>
      </form>
    )
  }
```

Let's save the file. Switch to the browser, and open the developer tools. Let's try submitting the form.

> Action: Type `hello` in the input field and submit the form

You can see, the message `Submitted the form!` getting printed on to the console.

See you in the next video.

# Script - part 2

Now, how do we get the data that user has typed in the input field? For that we will have to learn about controlled and uncontrolled components.

> Action: open https://reactjs.org/docs/uncontrolled-components.html

In our task form, we are able to type text in the input field. The DOM handles the form data. This is called an uncontrolled component. To get the data from such a component, we have to use a `ref`.

> Action: open https://reactjs.org/docs/refs-and-the-dom.html

As the docs say,

> Refs provide a way to access DOM nodes or React elements created in the render method.

Let's add a `ref` in our component and extract value from it once the form is submitted.

> Action: Switch to VSCode and open `TaskForm.tsx` and add following code.

```tsx
inputRef = React.createRef<HTMLInputElement>();
```

We add a class member `inputRef` which can hold a reference to a `HTMLInputElement`. Now, we can use it to map the corresponding input field.

```tsx
<input type="text" ref={this.inputRef} />
```

Now, let's modify the submission handler to print the value that user entered.

```tsx
addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  console.log(`Submitted the form with ${this.inputRef.current?.value}`);
};
```

If you hover the mouse over `this.inputRef.current?.`, you can see that the value of `current` can be null or an element. So TypeScript nudges us to access the value using `?.` operator.

Save the file. And reload the page. Now type in some text in the input field and click the button.

> Action: type `hello` in the input field and submit the form

You can see `Submitted the form with hello` getting printed on to the console.

This was uncontrolled component. In general, a controlled component is preferred. By controlled component, it means, the state of the component is managed by react.

> Action: open https://reactjs.org/docs/forms.html#controlled-components

We will use `setState` and `eventHandlers` to manage the input field. Let's edit the `TaskForm` component to use a state for input field. Let's remove the `refs`.

> Action: delete the refs.

We already have `title` in our state. Let's use it to track the input field value.

```tsx
  render(){
    return (
      <form onSubmit={this.addTask}>
        <input type="text" value={this.state.title}/>
        <button type="submit">Add item</button>
      </form>
    )
  }
```

Now, if you save the file and try typing into the rendered input field, nothing happens. And we have an error message in the console as well.

> Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.

This is because, we are not updating the `title` as the user enters data. To do that, we need to add a change handler to `input` field.

```tsx
  render(){
    return (
      <form onSubmit={this.addTask}>
        <input type="text" value={this.state.title} onChange={}/>
        <button type="submit">Add item</button>
      </form>
    )
  }
```

We can hover over the `onChange` and get the type of handler. Then create a member variable.

```tsx
titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {};
```

Next, we need to set the state using `setState` method.

```tsx
titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  console.log(`${event.target.value}`);
  this.setState({ title: event.target.value });
};
```

Then use this handler on the input field.

```tsx
  render(){
    return (
      <form onSubmit={this.addTask}>
        <input type="text" value={this.state.title} onChange={this.titleChanged}/>
        <button type="submit">Add item</button>
      </form>
    )
  }
```

Save the file. Now, we are able to type in the input field and value gets updated accordingly.

See you in the next video

# Script - part 3

In this video, we will connect together different components we created and finally be able to add tasks to our task list.

We must first create a `TaskApp` component. Create a file named `TaskApp.tsx` with following content. It will have a state to hold the list of tasks added.

```tsx
import React from "react";
import { TaskItem } from "./types";

interface TaskAppProp {}
interface TaskAppState {
  tasks: TaskItem[];
}
class TaskApp extends React.Component<TaskAppProp, TaskAppState> {
  constructor(props: TaskAppProp) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    return;
    <div></div>;
  }
}

export default TaskApp;
```

Next, we will add a method `addTask`, which will take a type `TaskItem` as first argument and adds it to the current state.

```tsx
addTask = (task: TaskItem) => {
  this.setState((state, props) => {
    return {
      tasks: [...state.tasks, task],
    };
  });
};
```

Now, we can include the `TaskForm` and `TaskList` components here.

```tsx

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

// ...

  render() {
    return;
    <div>
      <TaskForm />
      <TaskList tasks={this.state.tasks} />
    </div>;
  }

```

We can now add styling from level 1 to our `smarter-tasks`.

```tsx
render() {
    return (
      <div className="container py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl mb-2 font-bold text-slate-700">
          Smarter Tasks
        </h1>
        <h1 className="text-md mb-6 text-slate-600">
          <span className="font-bold">Project: </span>
          Graduation Final Year Project (Revamp college website)
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4">
            <h1 className="text-slate-500 font-bold text-center mb-2">
              Pending
            </h1>
            <TaskForm />
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
```

Next, let's edit the `TaskForm` component to accept `addTask` as a prop from `TaskApp` component.

> Action: Open `TaskForm.tsx` and update with following code.

```tsx
interface TaskFormProps {
  addTask: (task: TaskItem) => void;
}

//  ...

addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  const newTask = {
    title: this.state.title,
  };
  this.props.addTask(newTask);
  this.setState({ title: "" });
};
```

What we do here is, we invoke the `addTask` method which is passed via prop from parent component ie, `TaskApp` with the data user entered. Then we clears the state with empty task title.

Save the file. We can see TypeScript compiler is complaining about missing props. Let's fix that.

> Action: switch to `TaskApp.tsx`

Pass the `addTask` method as prop to `TaskForm` component.

```tsx
  render() {
    return (
      <div className="container py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl mb-2 font-bold text-slate-700">
          Smarter Tasks
        </h1>
        <h1 className="text-md mb-6 text-slate-600">
          <span className="font-bold">Project: </span>
          Graduation Final Year Project (Revamp college website)
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4">
            <h1 className="text-slate-500 font-bold text-center mb-2">
              Pending
            </h1>
            <TaskForm addTask={this.addTask} />
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
```

Now, only piece remaining is using `TaskApp` component in our `App` component.

> Action: switch to `App.tsx` and updte with following code.

```tsx
import TaskApp from "./TaskApp";

function App() {
  return (
    <div className="App">
      <TaskApp />
    </div>
  );
}
```

Save the file. Let's check the app in browser.

> Action: visit http://localhost:3000 and add few entries

We can see the items are getting added to our list. Let's also add the custom `TaskCard` css class from level 1 to our items.

> Action: Switch to `Task.tsx` and add styling from level 1.

```tsx
import "./TaskCard.css";

// ...


render() {
    return (
      <div className="TaskItem shadow-md border border-slate-100">
        <h2 className="text-base font-bold my-1">{this.props.title}</h2>
        <p className="text-sm text-slate-500">{this.props.dueDate}</p>
        <p className="text-sm text-slate-500">
          Description: {this.props.description}
        </p>
      </div>
    );
  }

```

`TaskCard.css` looks like:

```css
.TaskItem {
  /* border: 1px solid #DFDFDF; */
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 12px;
}
```

We can now see the tasks are displayed with the styling.

See you in the next lesson.
