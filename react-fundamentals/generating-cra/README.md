# Text
As we've successfully installed Node in our computer, we can use it to generate a new project. And in this video, I'm going to show that.

# Script
To generate a new React.Js application, we're going to use a tool called **NPX**. Now you might ask, I've heard about NPM: 
- Which is an online repository of open-source Node.js projects/libraries.
- And along with that, it's a CLI tool that helps us to install those packages and manage their versions and dependencies.
- And we get NPM out of the box when we install Node.js. 

But what is NPX?

So, **npx** is also a CLI tool, which makes it very easy to run any sort of Node.js based executable that you would normally install via npm.

You can run the following command called `which npx` to see if it is already installed.
> Action run the command in terminal

```sh
which npx
```

Yes, it's already installed. Since `npm` version 5.2.0, `npx` is pre-bundled with npm. So it’s pretty much a standard nowadays.

If npx is not installed in your computer, you can install it via this command:
```sh
npm install -g npx
```

### Now, let's generate our first React project

> Action: Open Terminal

For that, the command we are going to run is: `npx create-react-app <project-name>`. In our case, the project name would be `wd-301`.

```sh
npx create-react-app wd-301
```

Once we run the command, the installation process will take a couple of minutes. Once that is done, you'll notice that there is a brand-new folder inside your current directory called `wd-301`.

If we go inside this directory, we can start our project by running a very simple command:
```sh
npm start
```

And once the server starts, the default browser opens automatically to show the newly generated React application running in `3000` port.

That's great!

To stop the project, press "Ctrl + C" or "Command + C" in our terminal and to start once again, run `npm start`.

So, that's it for this video, see you in the next one.
