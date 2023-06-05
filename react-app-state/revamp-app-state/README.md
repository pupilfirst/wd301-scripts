# Script
This lesson is going to be very crucial, we in this lesson we will decide which information we will keep in application state and how? So let's get started.

### The Problem
Currently in our Smarter Tasks application, after login we've only one module: Projects. In projects page, we've two features:
1. Create new project
2. Listing all projects

Now, to list down all projects, we've used the `useReducer` hook in the `ProjectList` component. 
> Action: Keep this file open: (src/pages/projects/ProjectList.tsx). As it will be helpful to explain.

As part of the implementation, we've also defined a `reducer` function, using which we're changing the state for different action types, like: `API_CALL_START`, `API_CALL_END` and `API_CALL_ERROR`. And in this component, we've also defined a `fetchProjects` function, which is making API call to the `GET /projects` endpoint and dispatching different action types depending on success or error conditions.

Now, there are no problem with `ProjectList` component and the projects page is also working es expected. 

But this implementation have certain challanges:
1. What if, in another component we need the list of projects? In that case, we've to copy the whole implementation of `useReducer` and `fetchProjects` to that component as well.
2. And what if, we want to update the list of projects from another component or on a specific event? For example, do you remember the use-case, when we created a new project and that project was not showing up in the list until we did a manual refresh?

### The Solution
To address these challenges, we need to rethink our state design. In the context of the **"App State vs Component State"** lesson, we can identify that the information managed by the projects page, is a perfect candidate to be elevated to the application-level state. By doing so, we can overcome the limitations of duplicating code and ensure that updates to the project list are reflected consistently throughout the application.

So, the plan is: we will move the *project reducer* and *actions* to the top-level, and then we will make the projects `state` and `dispatch function` to update the state, available throughout the application using the Context API. 

![App-level-state](App-level-state.png)

So, as you can see in the diagram, we will create a `Projects Context Provider` and using it we will make the projects state and dispatch function available to the all child components of App component.

### The Implementation Plan
![state-folder-str.png](app-state.png)