# Script

> Action: Open "https://reactjs.org/docs/react-component.html#the-component-lifecycle" in browser

In this video, we will learn about different life cycle methods available in class based components.

Like the doc says, each component has a life cycle method, which can be used to override to run code.

> Action: Open "https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/"

There are basiclly three categories of life cycle methods:

- Mounting
  - These methods are called in the following order when an instance of a component is being created and inserted into the DOM.
    - `constructor`
    - `render`
    - `componentDidMount`

- Updating
  - An update can be caused by changes to `props` or `state`. These methods are called in the following order when a component is being re-rendered:
    - `render`
    - `componentDidUpdate`

- Unmounting
  - This method is called when a component is being removed from the DOM.
    - `componentWillUnmount`

You can learn more [about lifecycles here](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

Now, we will use these lifecycle methods to initialize and render our tasks. See you in the next video.


# Text

There are basiclly three categories of life cycle methods:

- Mounting
  - These methods are called in the following order when an instance of a component is being created and inserted into the DOM.
    - `constructor`
    - `render`
    - `componentDidMount`

- Updating
  - An update can be caused by changes to `props` or `state`. These methods are called in the following order when a component is being re-rendered:
    - `render`
    - `componentDidUpdate`

- Unmounting
  - This method is called when a component is being removed from the DOM.
    - `componentWillUnmount`

You can learn more [about lifecycles here](https://reactjs.org/docs/react-component.html#the-component-lifecycle)