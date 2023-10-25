In this lesson, we'll dive into Arrays and Tuples in TypeScript, learning how to work with collections of data and ordered lists of fixed data types.

## Arrays in TypeScript

Arrays are an essential data type in TypeScript. They allow you to store a collection of elements, typically of the same type. To create an array in TypeScript, you can use the following syntax:

> Action: Display the following snippet of code on Screen

```javascript
let arrayName: type[] = [value1, value2, ..., valueN];
```

Where `arrayName` is the name of your array, `type` is the type of elements in the array, and `value1`, `value2`, ..., `valueN` are the actual values.

Let's create arrays in TypeScript.

> Action: Paste the following snippet of code in `main.ts` file

```javascript
let projectID: number[] = [1, 2, 3, 4, 5];
let taskList: string[] = ["Fix Camera", "Buy Milk"];
```

Here, we have `projectID` as an array of numbers and `taskList` as an array of strings. TypeScript ensures that you can only add elements of the specified type to the array.

## Type Safety in Arrays

TypeScript's type safety extends to arrays. If you attempt to modify an array element with a different data type, TypeScript will catch it.

> Action: Paste the following snippet of code in `main.ts` file

```javascript
projectID[0] = "Make food"; // TypeScript will give an error here
taskList[1] = 5; // TypeScript will give an error here
```

These statements result in TypeScript compilation errors, which help you maintain data integrity.

## Tuples in TypeScript

Tuples in TypeScript are like arrays, but with a crucial difference: they store elements of fixed data types. A tuple is an ordered list with a specific type for each element.

To create a tuple in TypeScript, you can use the syntax

> Action: Display the following snippet of code on Screen

```javascript
let tupleName: [type1, type2, ..., typeN] = [value1, value2, ..., valueN]
```

For example, to create a tuple named user that holds a username (string) and a password (string), you can use the following code:

> Action: Paste the following snippet of code in `main.ts` file

```javascript
let user: [string, string] = ["johnDoe", "mySecretPassword"];
```

## Destructuring Tuples

In TypeScript, you can easily extract values from a tuple into separate variables using destructuring.

For example, to extract the username and password from the user tuple, you can use the following code:

> Action: Destructuring a tuple.

```javascript
let [username, password] = user;
```

This is called destructuring and helps in extracting the data from the Tuple.

In the upcoming lessons, you will be using the above data types to add functionality to your application that is error free to implement.

See you in the next lesson!
