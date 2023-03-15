# Text

Currently, your application works in your local environment. But it's time to show the whole world what it can do.

In this section, we will be looking at deploying our React application code using Netlify. Netlify is a PaaS that lets companies build, deliver, monitor and scale apps.

- Prerequisites
  Before you begin, you need to have a few things set up:

- A working React application
- A [Netlify](https://www.netlify.com/) account

### Create a production build

The first step is to create a production build of your React application. This helps us make sure we have a working version of the application that we plan on deploying. You can do this by running the following command in your terminal:

```bash
npm run build
```

This command will create a production-ready version of your React application in the `build` directory.

### Create a Netlify account

If you don't already have a Netlify account, create one by going to the [Netlify](https://www.netlify.com/) website and signing up.

### Create a new site on Netlify

Once you have a Netlify account, log in to the Netlify dashboard and click the "New site from Git" button.

Select the Git repository from GitHub that you use to host your React application's code, and follow the prompts to connect your repository to Netlify.

### Configure the build settings

After you've connected your repository to Netlify, you need to configure the build settings.

In the "Deploy settings" section of your Netlify dashboard, click the "Edit settings" button next to "Build & deploy".

In the build settings, you need to set the following:

- Build command: `npm run build`
- Publish directory: `build`

### Deploy your application

After you've configured the build settings, you can deploy your React application to Netlify by clicking the "Deploy site" button.

Netlify will now build and deploy your React application. When the deployment is complete, you'll be able to see your application live at the URL provided by Netlify.

See you at the next level!
