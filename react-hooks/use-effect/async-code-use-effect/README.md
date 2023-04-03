# Text

In this lesson, we will learn how to run asynchronous code using `useEffect` hook.

# Script

In this video, we will learn how to run asynchronous code using the `useEffect` hook. By asynchronous code, I mean synchronizing the data to a backend or sending any network requests.

> Action: Switch to `TaskApp.tsx`

We don't have any backend yet, instead we will print a message to the console using a `setTimeout`. Let's open the `TaskApp.tsx` file in Visual Studio Code.

Let's import `useEffect` hook first.

```tsx
import React, { useEffect } from "react";
```

You can also instead use the hook from already imported `React` package as `React.useEffect`.

Let's now remove the line that updates title when each task is added.

> Action: Remove `document.title =` line from `TaskApp.tsx`

```tsx
React.useEffect(() => {}, [taskAppState.tasks]);
```

We can now mock sending a network request by using a `setTimeout`.

> Action: Add the following code.

```tsx
React.useEffect(() => {
  const id = setTimeout(() => {
    console.log(`Saved ${taskAppState.tasks.length} items to backend...`);
  }, 5000);
  return () => {
    console.log("clear or cancel any existing network call");
    clearTimeout(id);
  };
}, [taskAppState.tasks]);
```

With this code in place, the `useEffect` will schedule a function, which will be invoked after 5 seconds, after a new task is added.

Let's save the file. We can now switch to our browser, and open the developer tools.

> Action: switch to browser and open the developer console. Add few tasks using the UI.

Now, let's try adding few tasks.

As you can see, the `setTimeout` gets invoked correctly. Whenever a new task is added, the previously scheduled `setTimeout` is cleared and is not invoked. You can easily verify it by commenting out the `clearTimeout`.

While writing `async` code in `useEffect` hook, it is easy to get `async`-`await` usage wrong. Do not mark the callback function as `async` and directly use `await` in the body.

```tsx
React.useEffect(async () => {
  // This is wrong usage
  const token = await saveTasksToBackend(taskAppState.tasks);

  return () => {
    cancelAPI(token);
  };
}, [taskAppState.tasks]);
```

In such a code, the clean up function will never get executed. Instead, we can write

```tsx
React.useEffect(() => {
  const saveTasks = async () => {
    token = await saveTasksToBackend(taskAppState.tasks);
  };
  saveTasks();
  return () => {
    cancelAPI(token);
  };
}, [taskAppState.tasks]);
```

See you in the next lesson.
