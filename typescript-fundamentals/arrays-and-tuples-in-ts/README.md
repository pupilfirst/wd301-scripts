In this lesson, let us discuss what Arrays and Tuples are in Typescript and how to use them in your code.

## Arrays

Arrays in TypeScript are a data type that allows you to store a collection of elements, typically of the same type. To create an array in TypeScript, you can use the syntax `let arrayName: type[] = [value1, value2, ..., valueN]`, where `arrayName` is the name you want to give to your array, type is the type of the elements in the array, and `value1`, `value2`, ..., `valueN` are the values of the elements in the array.

For example:

```js
let projectID: number[] = [1, 2, 3, 4, 5];
let taskList: string[] = ["Fix Camera", "Buy Milk"];
```

In the first line, we create an array of numbers called `numbers`. In the second line, we create an array of strings called `strings`.

As the array can only hold one specific type of data, trying to modify any data with a different data type will throw an error in typescript.

For example:

```js
projectID[0] = "Make food"; // TypeScript will give an error here
taskList[1] = 5; // TypeScript will give an error here
```

The above statements will result in a Typescript compilation error.

Arrays in TypeScript are helpful when storing elements of the same type. They allow you to work with basic JavaScript arrays with added safety built-in.

## Tuples

Tuples in TypeScript are similar to arrays, but unlike arrays, which can store elements of different types, tuples can store elements of fixed data types. In other words, a tuple is an ordered list of a fixed number of elements, where each element has a specific type.

To create a tuple in TypeScript, you can use the syntax

```js
let tupleName: [type1, type2, ..., typeN] = [value1, value2, ..., valueN]
```

For example, to create a tuple named `user` that holds a `username (string)` and a `password (string)`, you can use the following code:

```js
let user: [string, string] = ["johnDoe", "mySecretPassword"];
```

You can also use the below way to easily extract the values of the elements in a tuple into separate variables. For example, to extract the `username` and `password` from the `user` tuple, you can use the following code:

```js
let [username, password] = user;
```

This is called **destructuring** and helps in extracting the data from the Tuple.

In the upcoming lessons, you will be using the above data types to add functionality to your application that is error free to implement.

See you in the next lesson!
