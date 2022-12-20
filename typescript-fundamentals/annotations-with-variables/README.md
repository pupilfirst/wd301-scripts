# Text

In this lesson, let us discuss how to use annotations to add type information to variables in TypeScript.

First, let's talk about why we might want to use annotations with variables. In TypeScript, as we learned, annotations allow us to add type information to our code. This can help us catch errors before we run our code.

Annotations can be especially useful when working with variables, since variables can have many different types. By using annotations, we can specify the type of variable, which can help us avoid errors when using the variable.

To add an annotation to a variable, we use the `:` operator followed by the type. Here's an example:

```js
const name: string = "John Doe";
```

In this code, we've declared the `name` variable and specified that its type is `string`. This means that the name variable can only be assigned a value of type `string`.

Now that we've annotated the `name` variable, we can use the variable with confidence, knowing that it has the type we expect it to have.

We can also use the variable's type to help us catch errors. For example, if we try to assign a non-string value to the `name` variable, we'll get an error:

```js
name = 42; // Error: Type '42' is not assignable to type 'string'.
```

In addition to primitive types like `string` and `number`, we can also use annotations with complex types like `arrays` and `objects`.

Here's an example using an array:

```js
const names: string[] = ["John", "Jane", "Joe"];
```

In this code, we've declared the `names` variable and specified that its type is `string[]`, which means that it's an array of string values.

Now, we can use the `names` variable with confidence, knowing that it has the type we expect it to have.

We can also use the variable's type to help us catch errors. For example, if we try to push a non-string value onto the `names` array, we'll get an error:

```js
names.push(42); // Error: Argument of type '42' is not assignable to parameter of type 'string'.
```

In summary, annotations in TypeScript allow us to add type information to our variables, which can help us avoid errors and write more reliable code.

See you in the next lesson!
