In this lesson, we'll cover what type annotations and inference are and how they are used in TypeScript.

TypeScript being a superset of JavaScript introduces several features that are not available in JavaScript, such as static typing and type annotations.

Type annotations allow you to specify the expected data type of the function's arguments and return value. This can help make your code more self-documenting and prevent certain types of runtime errors.

For example, let's consider the following function that takes in the details of a user and returns a success message as a string. Add the below code to the `main.ts` where we have the interface for the User defined:

```js
function addUser(user: User): string {
  return user.name + " added successfully";
}
```

Here, we have used type annotations to specify that the `addUser` function takes in an input which follows the interface User and returns a string.

Type annotations are optional in TypeScript, and you can use them even if you don't have a type-checker installed. You can perform static type-checking to ensure that your code is type-safe.

Now, let's move on to type inference.

In TypeScript, type inference refers to the ability of the compiler to automatically determine the data type of a value based on its usage. This means that you don't have to explicitly specify the types of variables and expressions in your code, and the compiler will infer their types for you.

For example, consider the following code:

```js
let userName = "Jane"; // type: string
let userID = 10; // type: number
let uniqueID = userName + userID;
```

Here, the compiler will automatically infer that `userName` is a string and `userID` is a number and will concatenate the final output as a string.

By using type annotations and type inference together, you can write clean, self-documenting code that is also type-safe.

See you in the next lesson!
