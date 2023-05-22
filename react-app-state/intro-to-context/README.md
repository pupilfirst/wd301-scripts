# Script
In this lesson, we are going to learn about an interesting concept in React, called **context**. 

To understand it better, we will start with a problem statement, from our `Smarter Tasks` apps's point of view.

In our app, we currently have a `App` component, and inside the App component we have the `Appbar` component and a `main` element to render other child components. Now let's say if we would like to implement a dark mode - light mode theme switcher, then we have to keep the currently active theme value in the App component, and pass down the same information to the child components as **props**, right? 

![props-drilling](props-drilling.png)

So, as shown in the image, we have to pass the `theme` props from App component to the `Appbar` component, then the same props needs to be passed to the `PrimaryLinks`, or `UserLinks` component. And that is only one side of component tree, on the another side, where we've the `main` container, there more child components will come in future, where we have to show UI elements like: lists, tables, forms, buttons etc. And can you imagine, in that case we've to pass down the *theme* information as props to multiple layers of child components. And there is nothing wrong with that, but it's tedeaous job.

So, to help with this kind of situation, React introduced a concept called Context, using which we can share information or data in the form of numbers, strings, arrays and so on, or functions across different levels components inside of our application. Context is kind of like an alternative to the props system. Props is all about communication between a parent and an immediate child.

But with the contact system, we can share data across many different components, even if they don't have a direct link to each other.

![context](context.png)

So our context might share some data in the form of a number, a string, an array or so on, or even more complex things like an object. Once we share this data, our different components can then reach out to this context and ask for any particular pieces of data.

For example, the `Appbar` component or the `Button` component could ask for the theme information.

But, at this point, one thing I want to make super clear is that, **Context is not a replacement for props.** 

So the idea is, we are going to share some amount of data through context and we will still  make use of props for customizing individual components. So it is not a total replacement for the *props system*.
