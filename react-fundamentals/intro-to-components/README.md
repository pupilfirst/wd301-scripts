# Text
So far you've learned that, React is a JavaScript library for building user interfaces. Now you might ask, we can build user interfaces using HTML, CSS and normal JavaScript, then why we need React? 
Well, you can build any website without React, but if you are having more complex user interfaces and if you use React, all of a sudden it becomes much easier to build it. You will be able to focus on your core business logic that makes up your front-end application instead of having to focus on the actual steps of updating the page when something happens somewhere. And to make that work simpler for us, React embraces a concept called components. React is all about components. So, what exactly is a component? Let's find out.

# Script
Hello, in this lesson we will learn about components. 

Now, why I said that, let me explain.

> Action: Open presentation

I'll start with a simple statement, that is: 
### The heart of React is Components
A component is a piece of user interface(UI), which is:
- independent
- isolated
- and reusable.
This could be the menu bar for our website, the footer where we keep useful links and contact details, or a sidebar with the latest news updates.

Let's have a look at a finished application.

> Action: So, for that I'll open LinkedIn
Now here is linkedIn, as you can see we have a Navbar on top, the at the bottom we have three columns. 

The leftmost column contains my profile information at a glance. 
Then in the middle we have a card from where we can write a new post. Then after that we have news feeds. Now one important point to note here is that, every NewsFeed card has a same structure. Means, every card has the author's name or the company's name at top with logo, then it has the post content, then after that it has an action bar, where we have options to react on this specific post, view the comments and share this post.
Then on the right, we have some trending news headlines and some other links.

Now just assume if LinkedIn is developed using React.Js (though actually I don't know about it), then we can think of the 
- primary Navbar as a component
- The new post card as a component
- The profile card as a component etc. etc.

And components are in the end just a combination of HTML code, CSS code for styling and possibly JavaScript code for some logic.

Each and every component is showing a different set of data and have different responsibility in terms of functionality. That's how the components are *independent*.

And a component can be *reused* in another location without redefining it. For example this NewsFeed cards are re-used multiple times, right? And in programming, in general it is good if we don't repeat ourselves.

Components also allows us to separate our concerns. This helps us with keeping our code base small and manageable instead of having one large file which holds all the HTML code and all the JavaScript logic.

So in a an application each component should have one clear concern, one focus, one specific task that it should focus on. Then multiple components comes together to build  a complex UI. Like this whole LinkedIn application.

> Action: Back to slide

In general, you've to keep in mind that, user interfaces are about HTML, CSS and JavaScript.
And therefore, in React, components are all about combining HTML, CSS and JavaScript together(though, CSS part is optional here).

#### Let's have a look at a component in VS Code:
```jsx
const TaskList => {
  return (
    <h1>Hello World</h1>
  );
}
```
In this example, `TaskList` is a React component. Technically, a React component is a JavaScript function that you can sprinkle with markup. This component returns a `<h1 />` tag with some text inside. It is written like HTML, but it is actually JavaScript under the hood! This syntax is called **JSX**, and it lets you embed markup inside JavaScript. 

# Text
As you've learned about components, it's time to get your hands dirty and create a component on your own. See you in the next lesson.

