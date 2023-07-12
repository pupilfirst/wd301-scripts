# Text

Currently, your application works in your local environment. But it's time to show the whole world what it can do.

In this section, we will be looking at deploying our React application code using Netlify. Netlify is a PaaS that lets companies build, deliver, monitor and scale apps.

- Prerequisites
  Before you begin, you need to have a few things set up:

- A working React application
- A [Netlify](https://www.netlify.com/) account

### Create a Netlify Account

If you do not already have a Netlify account, you can create one by visiting the Netlify website and signing up.

### Install Netlify CLI

To ensure that you have the latest version of Netlify CLI installed, execute the following command:

```
npm install netlify-cli -g
```

### Initialize Netlify CLI and Sign In to Netlify

In the root directory of our Vite project, use the following command to create a new Netlify site:

```
netlify init
```

This command will open a browser window and prompt you to sign in to Netlify. Sign in using your GitHub credentials, as this will be beneficial for later stages when pulling your repository for builds and deployments.

### Create a New Site on Netlify

Once you have successfully signed in to your Netlify account, confirm and authorize the process.

In the Terminal, select the `Create & configure a new site` option.

You can choose the default options or configure them according to your requirements for the remaining options offered by the CLI.

### Configure Continuous Deployment Settings

After the site is created, Netlify CLI will request access to your GitHub account in order to configure Webhooks and Deploy Keys.

From the provided options, select `Authorize with GitHub through app.netlify.com`.

Next, a browser window will open with the option to `Connect to Git provider`.

In our case, select GitHub and authorize Netlify to access your repositories.

Once this process is successfully completed, you can close the browser window as instructed.

### Update Build Settings

Now, back in the Terminal, enter the following command to specify your build command:

```
npm run build
```

Next, specify the directory to deploy, which in this case is `build`.

When prompted to create a `netlify.toml` file with these build settings, enter `Y` and confirm.

Your application will be created successfully.

Netlify will now build and deploy your React application. Once the deployment is complete, you will be able to view your live application at the URL provided by Netlify.

See you at the next level!
