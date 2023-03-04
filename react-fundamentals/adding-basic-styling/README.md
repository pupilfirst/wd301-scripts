# Text

In this lesson, you will learn about styling React components. Now you've already learned that, a React component is nothing but a piece of UI which is composed of HTML, CSS and JavaScript. So, in any user interface, CSS plays a major role in terms of the look and feel. And that's not different in case of React as well.

So, in React we still use CSS, but there is nothing too React specific when it comes to CSS code. Still you can add a new CSS file for a component, and write all the CSS properties you want.

Let's create our first CSS file in this React application. So for that, create a new `TaskCard.css` file inside the `src` directory and add the following properties.
```css
.TaskItem {
  border: 1px solid #DFDFDF;
  border-radius: 4px;
  padding: 6px 8px;
  margin-bottom: 6px;
}
```
*Now, as this is not a CSS lesson, I won't bore you with explaining these properties.*

Now back in the `TaskCard.js`, we need to do one important thing. We need to make this overall build process aware of this CSS file and tell it that the CSS code in here should be considered and should be injected in the finished application. Because by default the build process is not going to browse all your files in `src` directory and automatically including everything in final build. You explicitly have to tell React, that a certain file should be considered.

So, we have to import the `TaskCard.css` file in the `TaskCard.js` file, like this:
```js
import 'TaskCard.css'

const TaskCard = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Completed on: due date...</p>
      <p>Assignee: name...</p>
    </div>
  )
}

export default TaskCard;
```
This simply tells the build process that the CSS files should be considered. 

Next, we have to figure out a way to apply the CSS classes to the React elements we've written using JSX. Now you might think, we can simply add the `class` attribute to the `div` tag here, and provide it the `TaskItem` css class. But in React, we are not allowed to add the `class` attribute to an element, instead we have to write `className`. 

```js
import './TaskCard.css'

const TaskCard = (props) => {
  return (
    <div className="TaskItem">
      <h2>{props.title}</h2>
      <p>Completed on: due date...</p>
      <p>Assignee: name...</p>
    </div>
  )
}

export default TaskCard
```

Now this might look strange, but you have to keep in mind that, this is not really HTML. It looks like HTML, but it's JSX syntax, and under the hood, it's still JavaScript code.

Now, that is how easy it is to add styling to your React components.


