# Text

We can use `useState` hook to store the state in a function based component. The initialization call to `useState` returns a pair of values - the current state itself, and a setter function that updates it.

We can initialise a state to store title of our task using the following syntax.

```tsx
import React, { useState } from "react";

// ...

function Task() {
  const [title, setTitle] = useState("");

  return (
    <li style={{ listStyleType: "none" }}>
      <h3>{title}</h3>
    </li>
  );
}
```

The initialization can also be done by passing a function.

```tsx
import React, { useState } from "react";

// ...

function Task() {
  const [title, setTitle] = useState(() => {
    return "";
  });

  return (
    <li style={{ listStyleType: "none" }}>
      <h3>{title}</h3>
    </li>
  );
}
```

We can make use of the `setter` function to update the state. Like we called `setState` in class based components, we can use `setTitle` function to update the `title` state variable.

Sample usage looks like:

```tsx
setTitle("Learn React Hooks");

```

We can declare multiple state variables:

```tsx
import React, { useState } from "react";

// ...

function Task() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <li style={{ listStyleType: "none" }}>
      <h3>{title}</h3>
      <div>{description}</div>
    </li>
  );
}
```

We can also use objects and arrays as state variable.

```tsx
import React, { useState } from "react";

// ...

function Task() {
  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  return (
    <li style={{ listStyleType: "none" }}>
      <h3>{task.title}</h3>
      <div>{task.description}</div>
    </li>
  );
}
```

But unlike in class components, the setter function replaces the state variable instead of merging it.
