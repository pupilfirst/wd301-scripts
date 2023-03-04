# Text

In this lesson, let us discuss annotations around functions in TypeScript.

Annotations around functions are used to specify the types of arguments a function expects, as well as the type of value it will return.

You can use the function keyword to declare the type of function in TypeScript. For example:

```js
function add(x: number, y: number): number {
  return x + y;
}
```

In this example, the `add` function is declared with two parameters, `x` and `y`, which are expected to be of type `number`. The function is also annotated with a return type of `number`, indicating that it will return a value of type `number`.

You can also use an arrow function syntax to declare a function type:

```js
const subtract: (x: number, y: number) => number = (x, y) => x - y;
```

In this example, the subtract constant is declared as a function that takes two `number` arguments and returns a `number`.

You can also use the `?` symbol to mark a function parameter as optional. For example:

```js
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}
```

In this example, the `greet` function has a required parameter `name` of type `string`, and an optional parameter `greeting` of type `string`. If the greeting parameter is not provided, the function will use the default value of "Hello".

You can also specify a default value for a function parameter using the `=` symbol. For example:

```js
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

In this example, the `greet` function has a required parameter `name` of type `string`, and a default value of "Hello" for the `greeting` parameter of type `string`. If the greeting parameter is not provided, the function will use the default value of "Hello".

In summary, annotations with functions in TypeScript allow us to modify and restrict the information passed to the functions, which can help us avoid errors and write more meaningful code.

See you in the next lesson!

