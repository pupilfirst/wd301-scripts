# Text

You can use [Vite](https://vitejs.dev) to scaffold your react application rather than using `create-react-app`.

The following command will scaffold a react application using Vite:

```sh
npm create vite@latest my-first-vite-application -- --template react
```

> We are using `npm` here instead of `npx` to scaffold a project unlike CRA.

Vite provides templates for many front-end libraries like [React, Svelte, preact etc.](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

To scaffold a react project with TypeScript support, you can use the following command

```sh
npm create vite@latest smarter-tasks -- --template react-ts
```

We had discussed creating a project [using CRA](https://www.pupilfirst.school/targets/19289) earlier with a similar command.

You should use appropriate name for the project that you are scaffolding.

Once the project is scaffolded, you can change into the project directory and install the dependencies.

```sh
cd smarter-tasks
npm install
```

Then you can run the application using the command:

```sh
npm run dev
```

You can rename the scripts to be `start` instead of `dev` to launch the server similar to project generated using `create-react-app`.

```json
"scripts": {
  "start": "vite",
  "build": "tsc && vite build"
},
```

Now onwards, you can use the same commands as we had covered in earlier lessons.

## Advantages of using Vite

- Blazing fast in transforming and compiling react project.
- Caching support, ie, Vite only recompiles code that has changed.

## References:

[Why use Vite](https://vitejs.dev/guide/why.html)
