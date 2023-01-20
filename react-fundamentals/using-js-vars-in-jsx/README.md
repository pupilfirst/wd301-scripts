# Script
The next thing I wanted to show you around JSX is how we can dynamically figure out what content we want to display inside of our component.

> Action: Open App component
> 
So instead of having a hardcoded `Hi there` , maybe we want to do some computation and decide  what to show on the screen depending upon the result of a network request or maybe some user input or whatever else.

So let me show you how to do that. 

```jsx
const App = () => {
  let message = "Bye There!"
  if (Math.random() > 1) {
    message = "Hello there"
  }
  return (
    <h1>Hi There!</h1>
  )
}
```
At the top of my component, I'm going to declare a variable using the `let` keyword called `message`, and I'll give it a string of `Bye there`. And then if we generate a random number using` Math.random` and if the number is greater than 1, then let's change my message to `Hello there`.

So now we've got some computation going on inside of our component to decide what we want to show on the screen.

So now we need to somehow take this variable `message` and print it up inside of our `h1`.
```jsx
const App = () => {
  let message = "Bye There!"
  if (Math.random() > 1) {
    message = "Hello there"
  }
  return (
    <h1>{message}</h1>
  )
}
```
To do so, I'm going to delete `Hi there`. I'm going to replace it with a set of *curly braces* and then reference the variable of `message`.

So this tells React that we want it to go and find a variable called `message` inside of our component. Take whatever value it has and print it up inside the `h1` tag.

The *curly braces* are the important part here. That's the part that tells React to find that variable and print it here. If I would save this, then sometime I'll see `Bye there` and if I continue to refreshing this page, eventually I'm going to see `Hello there`, whenever, I get a random number generated greater than 1.

The curly braces are not going to be printed up on the screen, so they get removed entirely. We are most often going to use this syntax anytime we are trying to print out a string or a number.

### Priting different type of values
There are other values we might eventually want to try to print, but you're going to see that they don't always show up quite as expected.

Let me see what I mean by that.

```jsx
const App = () => {
  const message = "A random string..."
  return (
    <h1>{message}</h1>
  )
}
```
So back over here, I'm going to delete this message stuff for just a moment.
And we'll create a constant variable instead called `message`. If I sign this, any kind of string and that's going to show up just fine.

If I assign it, any kind of number that's also going to show up just fine.
```jsx
const App = () => {
  const message = 988766
  return (
    <h1>{message}</h1>
  )
}
```

But if I start to assign other types of JavaScript data to this variable, such as a boolean of `true`, that's not going to show up on the screen. React doesn't know how to render a Boolean of `true`, so it's not going to show anything at all.
```jsx
const App = () => {
  const message = true
  return (
    <h1>{message}</h1>
  )
}
```
If I try to show `false`, I see nothing.
If I try `null` or `undefined`, nothing is going to show up.
 
### Arrays in JSX
```jsx
const App = () => {
  const message = [2,4,6,8]
  return (
    <h1>{message}</h1>
  )
}
```
If I try to print up an array that has some numbers inside of it, I'm going to get an unexpected result. React is going to take all the elements inside the array. It's going to remove the commas and just print up each element directly.

So that might not be what I really expect.

### Objects in JSX
And then finally, the last little corner case here that I want you to see, is that if we ever try to print a object inside of JSX, we're going to end up getting an error message.
```jsx
const App = () => {
  const message = {}
  return (
    <h1>{message}</h1>
  )
}
```
You might not see an error right now, but if I would open the b rowser console, there we'll be able to see that error message.

It says, *objects are not valid as React children*.

I can guarantee you're going to run into at some point if you ever try to show an object inside JSX, you're going to end up getting an error. 

### Let's summarize

So let's kind of wrap up or summarize what we just learned, because I went over some of these topics very, very quickly.

So first, we can show a variable inside of JSX by using those curly braces. Most often going to use **numbers** or **strings** just because those are the most common data types that we want to display to users. And React treats `booleans`, `nulls`, `undefined` and `arrays`, in a slightly unexpected way.

And then finally, absolute issue that we're going to run into all the time, when we would try to print up an object, React is going to throw an error and show nothing on the screen.