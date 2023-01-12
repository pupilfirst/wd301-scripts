# Script

In this video, we will learn how to build and deploy our react application to the internet.

To host our application, we will use GitHub. Let's head to GitHub and create a repository.

> Action: Visit github.com and create a repository

Let's name our repository `task-app`. Do not use the same repository which has the source code in it. We will keep it as separate repository.

Let's clone this repository.

> Action: clone the github repository to local folder.

```sh
git clone <git url>
```

Now, we will open our project in VS Code.

> Action: switch to VS Code and open package.json

If we look at `package.json`, we can see there is a build step under `scripts`. Let's use that to create a production deployment.

Run the following command from terminal.

```sh
npm run build
```

Now, the project is being built and the output will be in the `build` folder by default. Let's open the build folder.

> Action: open build folder and view the files.

Now we have to copy these files into the respository we just created.

> Action: Open newly cloned repo in finder and copy the files from build folder into it.

Let's commit these files. Open the terminal, browse to the repository location.

```sh
git add --all
git commit -m "Initial react app deployment"
git push
```

Once we push some content, we can change repository settings to host a static website.

> Action: visit the Github repository

Click on the `settings` icon. And select `Pages` from the menu on the left.

> Action: click settings tab, select pages item from left menu

We pushed the content to `main` branch. From under `Builds and deployment` > `Branch`, select`main`. Save the settings.

We can see a GitHub action has triggerred and deployed our app. It will take around 1 minute for the action to run.

Now let's visit the url `https://<username>.github.io/<repository-name>`.

> Action: Visit `https://<username>.github.io/<repository-name>`

We don't see our app. It is just a blank screen. Let's check the console to verify if there are any errors.

> Action: open browser tools and switch to console and reload the page.

The browser is unable to find the `JavaScript` and `CSS` files. Let's fix that.

> Action: open `https://create-react-app.dev/docs/deployment/#building-for-relative-paths`

If we read through react docs, there is an option to build our app for relative paths. We just need to add an entry in `package,json`.

Switch over to our react project and edit the `package.json`.

> Action: open `package.json`

Let's add following entry:

```json
"homepage": "https://username.github.io/repository-name",
```

Save the file. And let's repeat the same steps as before.

Run the `build` script.

```sh
npm run build
```

It will delete the previous buil automatically. Once the build is complete, let's replace the files in our deployment repository. We can delete the existing files, then copy the new ones.

> Action: Open the deployment depository, delete the files, copy new build

Now, let's commit this changes.

```sh
git add --all
git commit -m "Built with relative url"
git push
```

> Action: commit the changes. Then switch to GitHub in browser.

If you look at the repository, we can see, a new GitHub action has been triggerred.

> Action: visit the deployed app and add a todo item.

And once it is complete, let's visit our deployed app. And it is working as expected.

See you in the next video.


# Text

In this lesson we will learn to use GitHub to host our React app.

To create production build:

```sh
npm run build
```

The output will be in `build` folder. These files can be used to host a static website in GitHub.

To make the static files load correctly, you will have to add a `homepage` key in `package.json` before running the build step.

```json
"homepage": "https://username.github.io/repository-name",
```