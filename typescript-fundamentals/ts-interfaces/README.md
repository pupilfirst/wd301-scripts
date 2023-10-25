In this lesson, let us discuss in detail what are interfaces in TypeScript and how to use them.

An interface in TypeScript is a type that defines a contract for the shape of an object. It specifies the members that an object must have and their types.

For example, consider an interface for a `User` object that has a `name` property of type `string`, an `id` property of type `number`, and a function, `greet()`, that returns a `string`. Here is how we can define this interface:

> Action: Paste the following snippet of code in main.ts

```js
interface User {
  name: string;
  id: number;
  greet(): string;
}
```

We can then use this interface to create an object that adheres to this contract:

Let's create a `User` object.

> Action: Paste the following snippet of code in main.ts

```js
const user: User = {
  name: "Alice",
  id: 1,
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};
```

With this, our `user` object meets the `User` interface's requirements. If we tried to create an object that doesn't fulfill these requirements or contains properties of the wrong types, TypeScript would provide an error.

> Action: Paste the following snippet of code in `main.ts` file.

```js
const user: User = { name: "Alice" }; // Error: Property 'id' is missing in type '{ name: string; }'

const user: User = { name: "Alice", id: "10" }; // Error: Type 'string' is not assignable to type 'number'
```

For example If you'll try executing this snippet of you'll be see the error messages which i have written down in comments.

We can also use interfaces to define the shape of function arguments and return values. For example, here is an interface for a function that takes a User object and returns a string:

> Action: Paste the following snippet of code in `main.ts` file.

```js
interface GetGreetingFn {
  (user: User): string;
}
```

We can then create a function that adheres to this contract:

> Action: Paste the following snippet of code in `main.ts` file.

```js
const getGreeting: GetGreetingFn = (user: User) => {
  return user.greet();
};

console.log(getGreeting(user)); // "Hello, my name is Alice"
```

Interfaces can also be used to define the shape of classes. For example, we can define an interface for an `Employee` class that extends the `User` interface and has a salary property of type `number`:

> Action: Paste the following snippet of code in `main.ts` file.

```js
interface Employee extends User {
  salary: number;
}
```

We can then create a class that implements this interface:

> Action: Paste the following snippet of code in `main.ts` file.

```js
class Manager implements Employee {
  name: string;
  id: number;
  salary: number;

  constructor(name: string, id: number, salary: number) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  greet() {
    return `Hi, my name is ${this.name} and I am the manager.`;
  }
}

const manager = new Manager("Bob", 4, 50000);
console.log(getGreeting(manager)); // "Hi, my name is Bob and I am the manager."
```

Note that the `Manager` class must have the required properties and methods with the correct types in order to implement the `Employee` interface.

In summary, we can use interfaces in TypeScript to define a contract for the shape of an object, the members it can have and their data types.
