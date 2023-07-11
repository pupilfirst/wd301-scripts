# Text
As we've successfully installed Node in our computer, we can use it to generate a new project. And in this video, I'm going to show that.

# Script
To generate a new React.Js application, we're going to use a tool called **Vite**.

Vite, pronounced as "veet," is a build tool specifically designed for modern JavaScript applications. 

Vite has emerged as a game-changer in the world of JavaScript build tools. It offers a modern and lightning-fast development experience, making it a preferred choice for many developers. In this lesson, we will explore the basics of Vite and guide you through the process of generating a new React app using Vite.

Unlike traditional bundlers like Webpack or Rollup, Vite takes a different approach to boost development speed. It leverages native ES modules (import/export statements) to provide an incredibly fast development server and eliminates the need for bundling during development.

### Now, let's generate our first React project

> Action: Open Terminal

To generate a new React app using Vite, first we've to install a tool called `create-vite`. This tool helps us to start a project from a basic template for popular frameworks.

So, we will install `create-vite` using the following command:
```sh
npm install -g create-vite
```

Once that is complete, then we can create our new React app using the following command:
```sh
npx create-vite hello-react --template react
```

Once we run the command, the installation process will take a couple of seconds. Once that is done, you'll notice that there is a brand-new folder inside your current directory called `hello-react`.


Next, we will run `npm install` inside the new project folder, to install all dependencies.
```sh
cd hello-react
npm install
```

Next, we can start our project by running a very simple command:
```sh
npm run dev
```

And once the server starts, we will open `http://localhost:5173/` in the browser.
> Action: Open `http://localhost:5173/` in browser

And yes, we can see homepage.

That's great!

To stop the project, press "Ctrl + C" or "Command + C" in our terminal and to start once again, run `npm run dev`.

#### Changing the start command
Now, rather than using the `npm run dev` command to start the project, I think it would be better if we could start the project with `npm start` command. I want to do this because it would be more generic and can be used to start our application in various environments, including development, staging, or production. It's often used as a convention for starting the application in a non-development context. 

So to do that, we will open our `package.json` file, and there inside the scripts section, I'll replace the existing `"dev": "vite"` script with `"start": "vite"`.
```json
  "scripts": {
    "start": "vite",
    // ...
    // ...
  }
```

Now we will go back to our terminal and run the `npm start command`
> Action: Run `npm start` command in terminal (in project directory)

And yes! it works.

So, that's it for this video, see you in the next one.
