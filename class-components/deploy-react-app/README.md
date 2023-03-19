# Text

In this lesson, we will learn how to build and deploy our React application to the internet.

To host our application, we will use Netlify. Let's head to Netlify and create an account. We will use GitHub to login to Netlify.

> Action: Visit netlify.com and use GitHub to signup

Once logged in, select `Import an existing project` option from `Add new site` menu.

Next, select `GitHub` from the list of Git providers. Authorize Netlify to access your repositories. Provide access to `Only select repository`. Then type in `wd301` and select the course repository.

Click on Install button to initiate installation of site.

In the next page, select the `<your github username>/wd301` repository to proceed.

Now, we will have to specify the subdirectory which holds the source code for React app, the build command, and the path to which production build will be generated.

Type `smart-task-app` in base directory field. The other two fields should get automatically populated.

Projects generated with `create-react-app` has a `build` command already set up in `package.json`.

The `Build commad` should have the value `npm run build`.

When the build command is executed, a production build, which contains HTML, CSS, and JavaScript will be generated in `build` folder. We will add the output directory to `Publish directory`.

Publish directory should have the value `smart-task-app/build`.

Click on `Deploy site`. It will start a deployment job and will display the url to which React app is deployed.

Click on `Site Settings`. The React app should be built and deployed in under a minute.

Any further updates or commits which is pushed to Github will automatically trigger a deployment.

> Action: visit the deployed app and add a todo item.

Let's visit our deployed app. And it is working as expected.

See you in the next lesson.
