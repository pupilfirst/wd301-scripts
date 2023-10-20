In this lesson, we will learn about the **type system** in TypeScript. Let us go over the basics of the TypeScript type system and how it can help you write more reliable and maintainable code.

> You can use the `index.ts` file you have created to practice the concepts in this and subsequent lessons.

What is a type system? Simply put, a type system is a set of rules that a programming language uses to ensure that data is used correctly and consistently throughout the codebase.

In TypeScript, the type system helps you catch errors by validating, that variables and functions are used in a way that is consistent with their defined types.

There are several built-in types in TypeScript, including:

- `string`: A sequence of characters, such as "Hello, world!"
- `number`: A numeric value, such as 42 or 3.14
- `boolean`: A value that is either true or false
- `void`: Used to represent the absence of a return value for a function
- `null`: Used to represent the absence of a value
- `undefined`: Used to represent a value that has not been assigned a defined value

In addition to these built-in types, you can also define your own types in TypeScript using type aliases and interfaces.

Type aliases allow you to create a new name for an existing type. For example, you could create a type alias for a string array like so:

```js
type StringArray = string[];
```

You can then use the `StringArray` type whenever you want to refer to an array of strings.

Interfaces, on the other hand, allow you to define a structure for an object type. For example, you could define an interface for a user object like this:

```js
interface User {
  name: string;
  id: number;
  isAdmin: boolean;
}
```

You can then use the `User` interface to ensure that objects have the correct structure when they are created or passed around in your code.

Now that you know the basic types and how to define your own types in TypeScript, let's look at how you can use the type system to improve your code.

One of the main benefits of using the type system is that it can help you catch errors before you even run your code.

For example, if you try to assign a string to a variable that is expected to be a number, the TypeScript compiler will throw an error, alerting you to the problem. This can save you a lot of time and effort in debugging your code, especially as your codebase grows in size and complexity.

In your `index.ts` add the interface you created for the User. Try creating a new User using the following code:

```js
let newUser: User = {
  name: "Jane",
  id: "1",
  isAdmin: false,
};
```

The TS compiler will throw an error on your editor with the message `Type 'string' is not assignable to type 'number'.ts(2322)` as we are trying to set the value of `id` as a string.

In addition to catching errors, the type system can also make your code easier to read and understand. By explicitly defining the types of your variables and functions, you can make it clear to other developers what kind of data a function is expecting or what type of value a variable is holding. This can make it easier to maintain and modify your code over time.

In summary, the TypeScript type system is a powerful tool that can help you write more reliable and maintainable code. By using the built-in types and defining your own types using type aliases and interfaces, you can catch errors and make your code easier to understand.

See you in the next lesson.
