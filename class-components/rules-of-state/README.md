# Script

In this video, we will learn how to manage and update state in a class based component.

We initialize state in the constructor. This is the only place where we can directly mutate or change the `this.state` variable.

In every other place in the component, to make change to the state, we will have to use the `this.setState` method.

Rather than adding the list of tasks in constructor, let's use `componentDidMount` life cycle method.

> Action: Open `TaskList.tsx`

Let's add the `componentDidMount` method.

```tsx
componentDidMount() {

}
```

Then let's use `setState` method to update the state of the component.

> Action: cut the initialization value from constructor and paste it in `componentDidMount`

```tsx
componentDidMount() {
  this.setState({
    tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }]
  })
}
```

Save the file and the page gets refreshed.

> Action: switch to browser.

It works as before. Now, let's see if directly mutating the state works or not.

> Action: switch to VS Code

```tsx
componentDidMount() {
  this.state = {
    tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }]
  };
}
```

Save the file, and we can see, already a warning saying not to mutate the state directly.

If we look at `localhost:3000`, we only see a blank page. The tasks didn't get rendered. So, lets revert to use `setState`.

```tsx
componentDidMount() {
  this.setState({
    tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }]
  })
}
```

Now, if we open the browser console, we can see an error. React is complaining that "item in list should have a unique key". Let's fix that. We will use the index as the key for an item. This is okay in this simple example, we should ideally use a unique id, like the primary key from database while rendering a list of components.

```tsx
render() {
  return this.state.tasks.map((task, idx) => <Task key={idx} title={task.title} />);
}
```

The state updates are asynchronous in nature. React might optimize and batch different `setState` calls.

So if we have to update the state based on it's previous state, we should second syntax of `setState`:

```tsx
  componentDidMount() {
    const tasks = [{ title: "Pay rent" }, { title: "Submit assignment" }];
    this.setState((state, props) => ({
      tasks,
    }));
  }
```

In this syntax, we get the current state and props as first and second argument.

Let's save the file, and visit `localhost:3000`. The same list is rendered.

See you in the next lesson.

## Text

We can use `setState` to update the state of the component.

```tsx
this.setState({
  tasks: [{ title: "Pay rent" }, { title: "Submit assignment" }],
});
```

React will batch and optimize `setState` calls. So, if next state is dependent on existing state, you should use the second syntax of `setState` which accepts a function.

```tsx
const tasks = [{ title: "Pay rent" }, { title: "Submit assignment" }];
this.setState((state, props) => ({
  tasks,
}));
```
