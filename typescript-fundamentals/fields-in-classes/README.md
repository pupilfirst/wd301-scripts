# Text

In this lesson, let us discuss classes, fields and how we can use inheritance within it in Typescript. A class is a blueprint for an object. It defines the structure of an object, including its properties (also called fields) and methods.

Fields in a class are variables that store data associated with an object. They are similar to variables in a function, but they are defined at the class level and belong to the object itself.

Here's an example of a class with fields:

```js
class Person {
  name: string; // field to store the name of the person
  age: number; // field to store the age of the person

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

In this example, the Person class has two fields: name and age. Both fields are of type string and number, respectively. The fields are defined at the top of the class, outside any method.

The constructor method is a special method in a class that is called when an object is created from the class. It is used to initialize the object's fields. In the example above, the constructor method takes two arguments: name and age, which are then assigned to the object's name and age fields using the `this` keyword.

To create an object from the Person class, we can use the new keyword followed by the class name and the arguments for the constructor method:

```js
let person = new Person("John", 30);
```

This will create a new Person object with the name "John" and the age 30.

We can access the fields of an object using the dot notation:

```js
console.log(person.name); // prints "John"
console.log(person.age); // prints 30
```

In addition to simple fields like strings and numbers, we can also have fields that are objects or arrays:

```js
class Person {
  name: string;
  age: number;
  hobbies: string[]; // field that is an array of strings

  constructor(name: string, age: number, hobbies: string[]) {
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}

let person = new Person("John", 30, ["reading", "running"]);
console.log(person.hobbies); // prints ["reading", "running"]
```

We can also have fields that are objects of a custom type:

```js
class Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;

  constructor(street: string, city: string, state: string, zipCode: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }
}

class Person {
  name: string;
  age: number;
  hobbies: string[];
  address: Address; // field that is an object of the Address type

  constructor(name: string, age: number, hobbies: string[], address: Address) {
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
    this.address = address;
  }
}

let address = new Address("123 Main St.", "New York", "NY", "10001");
let person = new Person("John", 30, ["reading", "running"], address);
console.log(person.address); // prints the address object
```

We can also specify that a field is optional by using the `?` symbol:

```js
class Person {
  name: string;
  age: number;
  hobbies?: string[]; // optional field
  address: Address;

  constructor(name: string, age: number, hobbies: string[] = [], address: Address) {
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
    this.address = address;
  }
}

let person = new Person("John", 30, [], address);
```

In this example, the hobbies field is optional, so we can create a Person object without providing a value for it.

All the above functionalities along with what we have learned in the previous lessons will help you create, efficient and type-safe code, thereby reducing programming errors in your development.

The major benefit of typescript which is pipe safety can solve a lot of programming errors, thereby helping you concentrate more on the application logic during your development.

You can learn more about it [here](https://www.typescriptlang.org/docs/).

