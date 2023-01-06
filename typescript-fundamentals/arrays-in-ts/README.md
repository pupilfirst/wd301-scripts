# Text

In this lesson, let us discuss what Arrays are in Typescript and how to use them in your code.

Arrays in TypeScript are a data type that allows you to store a collection of elements, typically of the same type. To create an array in TypeScript, you can use the syntax `let arrayName: type[] = [value1, value2, ..., valueN]`, where `arrayName` is the name you want to give to your array, type is the type of the elements in the array, and value1, value2, ..., valueN are the values of the elements in the array.

For example:

```js
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: string[] = ["Hello", "world", "!"];
```

In the first line, we create an array of numbers called `numbers`. In the second line, we create an array of strings called `strings`.

Once you've created an array, you can access and manipulate its elements using its indices. For example:

```js
console.log(numbers[0]); // Output: 1
console.log(strings[1]); // Output: "world"

numbers[0] = 42;
strings[1] = "TypeScript";

console.log(numbers[0]); // Output: 42
console.log(strings[1]); // Output: "TypeScript"
```

In this example, we use the indices `0` and `1` to access the first element of each array. We then use assignment to modify the values of these elements.

As the array can only hold one specific type of data, trying to modify any data with a different data type will throw an error in typescript.

For example:

```js
numbers[0] = "Hello";
strings[1] = 5;
```

The above statements will result in a Typescript compilation error. 

Arrays in TypeScript are helpful when storing elements of the same type. They allow you to work with basic JavaScript arrays with added safety built-in.

See you in the next lesson!