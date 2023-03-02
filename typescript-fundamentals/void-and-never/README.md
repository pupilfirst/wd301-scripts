# Text

In this lesson, we'll cover what `void` and `never` types are, when you might use them and how they differ from each other.

In TypeScript, there are two special types called `void` and `never` that are used to represent the absence of a value.

The `void` type represents the absence of any type. It is commonly used as the return type of function that does not return a value. For example:

```js
function printHello(): void {
  console.log("Hello!");
}
```

In this example, the `printHello` function does not return a value, so its return type is `void`. If we try to return a value from this function, TypeScript will give us an error:

```js
function printHello(): void {
  console.log("Hello!");
  return "hello"; // TypeScript will give an error here
}
```

The `never` type represents the absence of a value, but it indicates that the function will never return. This is useful for representing functions that throw an error or never terminate. For example:

```js
function throwError(): never {
  throw new Error("An error occurred!");
}
```

In this example, the `throwError` function never returns because it always throws an error. Therefore, its return type is `never`.

Another example of a function that has a return type of never is one that has an infinite loop:

```js
function infiniteLoop(): never {
  while (true) {
    // do something...
  }
}
```

In this example, the `infiniteLoop` function never returns because it has an infinite loop that never ends. Therefore, its return type is `never`.

Using these types in TypeScript can help you catch errors in your code and ensure that your functions are working as intended.

See you in the next lesson!