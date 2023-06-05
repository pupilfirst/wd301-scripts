# Text 1
So far, we have focused on managing component-level state, and during this process, we have become familiar with two essential React hooks:

1. **useState**, which is ideal for managing simple and straightforward states.
2. **useReducer**, which is particularly useful for handling more complex states.
   
But this Component-level state in React has certain limitations that make it unsuitable for certain scenarios. Here are a few limitations:

a) **Limited Scope:** Component-level state is confined to the specific component where it is defined. It cannot be shared across multiple components or accessed by components that are not directly related.

b) **Prop Drilling:** When multiple components need access to the same state, it becomes cumbersome to pass the state down through props from parent to child components. This is known as prop drilling and can lead to messy and hard-to-maintain code.

### Application-level state
In these situations, application-level state management becomes necessary. Application-level state refers to the practice of maintaining state at a higher level, which can be built using the native React Context API, or using third party libraries like: [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/).

Application-level state offers the following benefits:

**1. Centralized State:** Application-level state management allows for a centralized store where state can be accessed and modified by multiple components across the application.

**2. Avoids Prop Drilling:** With application-level state, there's no need to pass state through multiple layers of components. Components can directly access the state they need without relying on prop drilling.

**3. Global Accessibility:** Application-level state can be easily accessed by any component within the application, regardless of their hierarchical relationship.

**4. Better Scalability:** As the application grows, managing state at the application level provides a more scalable and maintainable solution compared to component-level state.


### How to decide, when to use App-level State and when to use Component State?
The choice between app state and component state depends on the nature of the data you're dealing with and it's scope of usage within your application.

So,
Use **App State**:

- When data needs to be shared and accessed across multiple components.
- When the state affects the behavior of different components or triggers side effects.
- When the state needs to be persisted, such as user authentication status or application settings.

For example, say our component is dealing with Dropdowns, then its visibility state can be managed using component-level state. Each instance of the dropdown component can have its own visibility state, allowing individual dropdowns to open or close independently.

Use **Component State**:

- When data is specific to a single component and not required by other components.
- When reusability is important, and you want to keep the state isolated within the component.

For example, in our application we are allowing users to choose between different themes, such as light mode and dark mode, the selected theme can be stored in the app state. This way, the theme can be applied globally to all components and maintained consistently across the application.

It's important to note that the choice  between using app state or component state is not an either-or decision. In fact, you can have a combination of both in your application, leveraging app state to manage shared data and component state to handle component-specific data.


# Script 1



# Script
In  this lesson, we will re-design our application state. So let's get started.

# The Plan
So the plan is:
- 
![state-folder-str.png](app-state.png)