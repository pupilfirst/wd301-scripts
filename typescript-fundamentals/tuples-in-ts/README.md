# Text

In this lesson, let us discuss what Tuples are and how to use them in your TypeScript code.

Tuples in TypeScript are similar to arrays, but unlike arrays, which can store elements of different types, tuples can store elements of fixed data types. In other words, a tuple is an ordered list of a fixed number of elements, where each element has a specific type.

To create a tuple in TypeScript, you can use the syntax 

```js
let tupleName: [type1, type2, ..., typeN] = [value1, value2, ..., valueN]
```

Here `tupleName` is the name you want to give to your tuple, `type1, type2, ..., typeN` are the types of the elements in the tuple, and `value1, value2, ..., valueN` are the values of the elements in the tuple.

For example, to create a tuple named `user` that holds a `username (string)` and a `password (string)`, you can use the following code:

```js
let user: [string, string] = ["johnDoe", "mySecretPassword"];
```

To access the elements of a tuple, you can use the index of the element you want to access, starting from 0. For example, to access the `username` in the `user` tuple, you can use the following code:

```js
let username = user[0];
```

You can also use the below way to easily extract the values of the elements in a tuple into separate variables. For example, to extract the `username` and `password` from the `user` tuple, you can use the following code:

```js
let [username, password] = user;
```
This is called destructuring and helps in extracting the data from the Tuple. 

Tuples in TypeScript are helpful when storing a fixed number of elements of fixed types. They allow you to work with ordered lists of elements and easily extract the values of individual elements using destructuring or their indexes.

See you in the next lesson!


