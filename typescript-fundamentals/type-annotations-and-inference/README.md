In this lesson, we'll explore two essential concepts in TypeScript: `Type Annotations` and `Type Inference`, and understand how they are used to make your code more robust and self-documenting.

## Type Annotations

Type Annotations in TypeScript allow you to explicitly specify the expected data types of function arguments and return values. This not only makes your code more self-documenting but also helps prevent certain types of runtime errors.

Let's consider an example with type annotations.

> Action: Paste the following snippet of code in `main.ts` file.

```javascript
function addUser(user: User): string {
  return user.name + " added successfully";
}
```

In this code, we've used type annotations to declare that the `addUser` function expects an argument following the `User` interface and will return a `string`. This clarity in our code helps us catch type-related issues early.

Type annotations are optional in TypeScript, even without a type-checker installed. You can still use them for static type-checking, ensuring your code is type-safe.

## Type Inference

Type Inference in TypeScript refers to the compiler's ability to automatically deduce the data type of a value based on its usage. This means you don't always need to explicitly specify variable or expression types; the compiler can figure them out for you.

> Action: Let's see type inference in action.

```javascript
let userName = "Jane"; // type: string
let userID = 10; // type: number
let uniqueID = userName + userID;
```

In this code, the TypeScript compiler automatically infers that `userName` is of type `string`, `userID` is of type `number`, and `uniqueID` becomes a string. This simplifies your code while ensuring type safety.

## Combining Annotations and Inference

By combining Type Annotations and Type Inference, you can write clean, self-documenting code that's also type-safe. Use annotations where clarity is essential, and let inference do the heavy lifting when types are obvious.

## Conclusion

That wraps up our lesson on TypeScript Type Annotations and Inference. These concepts are fundamental for writing type-safe and clear code in your ReactJS and TypeScript projects. Stay tuned for the next lesson where we'll dive into more TypeScript goodness!
