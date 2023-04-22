# Text
In this lesson we will learn to fetch data in React JS with using `Async Await`. Previously we've made our first API call from a React component, but there we've used `fetch` which returns a Promise. There we've used `.then()` to handle the response and extract the data from it. However, this can lead to "**callback hell**" and make the code difficult to read and maintain.

So let's rewrite the same component using `Async Await`.

# Script
Using `async` and `await` is a cleaner and more readable way to handle Promises. The `async` keyword is used to declare that a function returns a Promise, and the `await` keyword is used to wait for the Promise to resolve before continuing with the execution of the code. We've already covered `async-await` in a detail, [in WD201](https://www.pupilfirst.school/targets/18959).

So to start with the implementation, first, we have to clean up all code present in the `ReactPlayground` component in our _ReactPlayground.tsx_ file.
> Action: Clear ReactPlayground component

Now, let's implement the async await way to fetch data:
```tsx
import React, { useState, useEffect } from 'react';
const ReactPlayground = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
export default ReactPlayground;
```

In this component, we've declared the `fetchData` function as `async`, which means it returns a **Promise**. We then use `await` to wait for the Promise returned by `response.json()` to resolve and return the data as a JSON object. 

Then we've used the `setData` function to update the `data`. And once the data updates, it rerenders the component.

Now let's go back to the browser to check if it's working.
> Action: Open browser and open network console
As you can see, when we refresh the page, it's making an API call to the JSONPlaceholder and fetching the list of posts. So, initially when the `data` is an empty array, we are unable to see any post. But as soon as the API call is made, then the `setData` function is getting called, which is updating the `data` value in component state. And once the data updates, the component rerenders and shows the list of all posts.

So, that was a quick re-fractoring on fetching data in React more efficiently. We've used `async and await` to make the code more readable and easier to follow, as it avoids nested callbacks and allows the code to be written in a more sequential manner.

That's it for this lesson, see you in the next one.
