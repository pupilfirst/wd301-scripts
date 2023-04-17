# Text

You can use [Vite](https://vitejs.dev) to scaffold your react application rather than using `create-react-app`.

The following command will scaffold a react application using Vite:

```sh
npm create vite@latest my-first-vite-application -- --template react
```

Vite provides templates for many front-end libraries like [React, Svelte, preact etc.](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

To scaffold a react project with TypeScript support, you can use the following command

```sh
npm create vite@latest smarter-tasks -- --template react-ts
```

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

## Advantages of using Vite

- Blazing fast in transforming and compiling react project.
- Caching support, ie, Vite only recompiles code that has changed.

## References:

[Why use Vite](https://vitejs.dev/guide/why.html)
