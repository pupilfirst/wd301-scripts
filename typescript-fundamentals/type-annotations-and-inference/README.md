# Text

In this lesson, we'll cover what type annotations and inference are and how they are used in TypeScript.

TypeScript being a superset of JavaScript introduces several features that are not available in JavaScript, such as static typing and type annotations.

Type annotations allow you to specify the expected data type of the function's arguments and return value. This can help make your code more self-documenting and prevent certain types of runtime errors.

For example, let's consider the following function that takes in a string and returns a modified version of that string:

```js
function addExclamation(s: string): string {
    return s + "!";
}
```

Here, we have used type annotations to specify that the `addExclamation` function takes in a string and returns a string.

Type annotations are optional in TypeScript, and you can use them even if you don't have a type-checker installed. You can perform static type-checking to ensure that your code is type-safe.

In addition to specifying types for function arguments and return values, you can also use type annotations to specify the types of variables and expressions in your code. For example:

```js
function addExclamation(s: string): string {
    const exclamation: string = "!";
    return s + exclamation;
}

```

Here, we have annotated the exclamation variable with the string type to indicate that it is a string.

Now, let's move on to type inference.

In TypeScript, type inference refers to the ability of the compiler to automatically determine the data type of a value based on its usage. This means that you don't have to explicitly specify the types of variables and expressions in your code, and the compiler will infer their types for you.

For example, consider the following code:

```js
let x = "hello";  // type: string
let y = 10;  // type: number
let z = x + y;

```

Here, the compiler will automatically infer that `x` is a string and `y` is a number. However, since you cannot concatenate a string and a number, this code will raise a type error at compile time.

By using type annotations and type inference together, you can write clean, self-documenting code that is also type-safe.

See you in the next lesson!