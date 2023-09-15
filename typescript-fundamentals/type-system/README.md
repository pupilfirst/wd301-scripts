**[INTRODUCTION]**

Hello! In this level, we will dive deep into the TypeScript type system. We'll explore the basics and understand how it can make your code more reliable and maintainable.

Let's start by answering a fundamental question:

**[WHAT IS A TYPE SYSTEM?]**

> Action: Display the text "What is a type system?" on the screen.

A type system is a set of rules that a programming language uses to ensure that data is used correctly and consistently throughout your codebase. In TypeScript, this type system helps you catch errors by validating that variables and functions are used in a way that matches their defined types.

Now, let's take a closer look at the built-in types in TypeScript.

**[BUILT-IN TYPES]**

> Action: Display a list of built-in types on the screen.

In TypeScript, we have several built-in types, including:

- `string`: This represents a sequence of characters, like "Hello, world!"
- `number`: It's for numeric values, such as 42 or 3.14.
- `boolean`: This type can only be `true` or `false`.
- `void`: Used when a function doesn't return any value.
- `null`: Represents the absence of a value.
- `undefined`: Used when a value hasn't been assigned yet.

Now, let's explore how you can create your own types in TypeScript.

**[USER-DEFINED TYPES]**

> Action: Display the code example for creating a type alias and an interface.

In TypeScript, you can define your own types using type aliases and interfaces.

- **Type Aliases**: These allow you to create a new name for an existing type. For example, you can create a `StringArray` type for an array of strings.

```typescript
type StringArray = string[];
```

- **Interfaces**: They help you define a structure for an object type. Here's an example of an `User` interface:

```typescript
interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}
```

These user-defined types can ensure that objects in your code have the correct structure.

**[BENEFITS OF THE TYPE SYSTEM]**

> Action: Display the benefits of using the TypeScript type system.

Now that you know about types, let's talk about the benefits of using the type system.

- **Error Catching**: TypeScript catches errors before you run your code. If you try to assign a string to a variable expecting a number, TypeScript will throw an error. This saves you time and effort in debugging.

- **Code Readability**: By explicitly defining types, your code becomes more readable and understandable. Other developers can quickly grasp what data a function expects or what type of value a variable holds. This helps with code maintenance and modification.

In summary, TypeScript's type system is a powerful tool for writing reliable and maintainable code. By using built-in types and defining your own types, you can catch errors early and improve code readability.

> Action: Transition to the closing shot.

That's it for this lesson! We'll see you in the next one as we dive even deeper into TypeScript. Happy coding!
