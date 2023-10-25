In this lesson, let us work to integrate TypeScript and make it work with our existing application.

Follow the steps below to ensure the existing application created in the previous level, `hello-react` is migrated to TypeScript.

## Install TypeScript:

Open your terminal and navigate to the root folder of our project.

> Action: Run the following command:

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

This will install TypeScript and related packages as a development dependency of your project.

## Rename files:

In the `src` folder of your project, rename any files you have created with a `.js/.jsx` extension to `.tsx`.
This tells TypeScript to treat those files as TypeScript files.

## Configure TypeScript:

Create a new file named `tsconfig.json` in the root folder of your project if it is not already created.
Add the following code to `tsconfig.json`:

> Action: Paste the following code in `tsconfig.json`

```js
{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true,
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

This configures TypeScript to use the JSX syntax, target ES5, and include the `src` folder in the compilation.

- Fix any errors on the Typescript code:
  Ideally, your application should work from the get go, but if you face any errors, the pre-existing `eslint` configuration should highlight those and provide solutions to fix them.

- Restart the development server:
  If you have the development server running, stop it and re-run the server again with:

```
npm run dev
```

This will compile your TypeScript code and start the development server.

Now your application is compatible to work with TypeScript and you can start using TypeScript features in your code, such as type annotations, interfaces, and more.

You can read more about [types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

See you in the next one!
