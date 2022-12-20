# Text

In this lesson, let us discuss how to use annotations to add type information to objects in TypeScript.

First, let's talk about why we might want to use annotations with objects.

Annotations can be especially useful when working with objects, since they can have many properties with different types. 

By using annotations, we can specify the types of each property in an object, which can help us avoid errors when accessing properties or calling methods on an object.

To add annotations to an object, we first need to declare the type of the object. This is similar to how we declare the type of the variable, except that we use a set of curly braces to enclose the types of each property in the object.

Here's an example:

```js
const user: {
  name: string;
  age: number;
  email: string;
} = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com"
};
```

In this code, we've declared the type of the `user` object as a set of three properties: `name, age, and email`. We've also specified the type of each property, using the `:` operator followed by the type.

Now that we've declared the type of our object, we can use the object with confidence, knowing that it has the properties we expect it to have.

We can also use the object's type to help us catch errors. For example, if we try to access a property that doesn't exist on the object, we'll get an error:

```js
console.log(user.address); // Error: Property 'address' does not exist on type '{ name: string; age: number; email: string; }'.
```

In addition to providing type information for properties, we can also use annotations to specify the type of methods in an object. This can be especially useful when working with objects that have complex behavior.

Here's an example:

```js
const user: {
  name: string;
  age: number;
  email: string;
  greet: (name: string) => string;
} = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
  greet(name: string) {
    return `Hello, ${name}!`;
  }
};
```

In this code, we've added a `greet` method to the user object. We've also specified the type of the `greet` method using the same syntax we used for the object's properties.

Now, when we call the greet method, TypeScript will check that we're passing the correct type of argument, and it will also check that the method is returning the correct type of value.

By using type annotations around objects, you can write clean, type-safe code that minimizes the errors in code execution.

See you in the next lesson!