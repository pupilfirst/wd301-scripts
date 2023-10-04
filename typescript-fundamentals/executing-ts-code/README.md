## INTRODUCTION

Hello! In this level, we'll tackle a fundamental aspect of TypeScript: how to execute and run TypeScript code.

If you're new to TypeScript, you might be wondering how to take the code you've written and actually run it in a web browser or another environment. Let's go over the steps you need to follow to do just that.

> Action: Display the text "TypeScript Compilation" on the screen.

First, it's important to understand that TypeScript code cannot be directly run in a web browser or other environments. TypeScript is a compiled language, which means it needs to be transformed into plain JavaScript before it can be executed. But don't worry, TypeScript makes this process easy.

## STEP 1: Install TypeScript Compiler

> Action: Display the command to install the TypeScript compiler.

The first step is to install the TypeScript compiler on your machine. You can do this by running the following command in the terminal:

```shell
npm install -g typescript
```

This installs TypeScript globally on your system.

## STEP 2: Create a TypeScript File

> Action: Show the creation of an `index.tsx` file and add code.

Next, create a new file in your working directory, i.e., `hello-react` folder and name it `index.ts`. Inside this file, you can write your TypeScript code. For example:

```typescript
console.log("This is a TypeScript file!!!");
```

## STEP 3: Compile TypeScript Code

> Action: Demonstrate how to compile TypeScript code.

Once you have the TypeScript compiler installed, you can use it to compile your TypeScript code into JavaScript. To do this, navigate to `hello-react` directory that contains the file you just created and run the following command:

```shell
tsc index.tsx
```

This command will compile your `index.tsx` file into a corresponding `index.js` file. You can also compile multiple TypeScript files at once by specifying them as additional arguments.

## STEP 4: Run JavaScript Code

> Action: Show how to run the generated JavaScript code in a web browser.

Now that your TypeScript code is compiled into JavaScript, you can run it just like any other JavaScript code. If you're running it in a web browser, include the generated `.js` file in your HTML file like this:

```html
<script src="index.js"></script>
```

Alternatively, if you want to run the generated JavaScript code using Node.js, you can use the following command:

```shell
node index.js
```

## ALTERNATIVE: Using ts-node

> Action: Explain an alternative method using `ts-node`.

While the previous steps work, in most scenarios, we use Node.js bundled with other packages to run our TypeScript applications.

Alternatively, you can use an external npm package called `ts-node` to compile and run your TypeScript code in a single command.

- Install and use the `ts-node` package by running:

```shell
npm install -g ts-node
```

- Once installed, you can directly execute your TypeScript code by running:

```shell
ts-node index.ts
```

This simplifies the process of running TypeScript code.

## CONCLUSION

> Action: Transition to the closing shot.

That's it for this lesson on executing and running TypeScript code! Now you know how to take your TypeScript code and make it run in your chosen environment.

In future lessons, we'll delve deeper into TypeScript. See you in the next one, and happy coding!
