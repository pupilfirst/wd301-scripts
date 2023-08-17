# Text
In this lesson, we will learn to add **Tailwind CSS** to our React application.

We all know that, Tailwind CSS is a utility-based low-level CSS framework intended to ease building web applications with speed and less focus to writing custom CSS, without leaving the comfort zone of your HTML code, yet achieve awesome interfaces. Let's install Tailwind CSS in this React project.

First, open your terminal in the project folder and execute the following command to install `tailwindcss` via *npm*:

```sh
npm install -D tailwindcss postcss autoprefixer --save
```

Next, let's generate the Tailwind configuration file, using the following command:
```sh
npx tailwindcss init -p
```
This command will generate a `tailwind.config.js` file in the project folder. Next, we have to add the paths to all of our template files in in this file. For that, add the following lines in the `content` part of the configuration.
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Next, we have to add the `@tailwind` directives for each of Tailwind’s layers to our `./src/index.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* then we will comment out the default CSS for body tag */
/* body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
} */
```

After that, we will remove the reference of `App.css` from the `App.jsx` file. Then we can completely delete the `App.css` file.
> Action: Delete App.css file.

Finally, we are all set to use the Tailwind classes. Just restart the React application and let's apply a class name in the `TaskCard` component.
```js
import './TaskCard.css'

const TaskCard = (props) => {
  console.log(props)
  return (
    <div className='TaskItem'>
      <h2 className="text-xl font-bold">{props.title}</h2>
      <p>Completed on: due date...</p>
      <p>Assignee: name...</p>
    </div>
  )
}

export default TaskCard
```

Refresh the browser and see the Tailwind magic!
