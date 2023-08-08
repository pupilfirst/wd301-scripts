## Problem Description

To complete this milestone, you have to make the following changes in the `hello-react` application:
1. Pass the `dueDate`, `completedAtDate` and `assigneeName` as props from the `App` component and to the `TaskCard` component.
2. Show the *due date* and *assignee name* on the task cards of `Pending` list.
3. Show the *completed on* and assignee name on the task cards of `Done` list.
4. Use TailwindCSS to design the application as shown in the wireframe below:

![st.png](st.png)

One important point to note here is that, the task cards present in `Pending` list should not show the `completed on` and the tasks present in `Done` list should not show the `due date`. Means you have to apply some logic in the `TaskCard` component to make it work.

## Submission Requirements

1. Create a new public repository in your GitHub account named `wd301`.
2. After the implementation, commit your changes, and push the code to this new GitHub repository. 

## Repo structure

At this point in the course, this is how your repo should be structured:

```
.
├── hello-react
|   ├── public
|   ├── src
|   |   ├── App.jsx
|   |   ├── App.css
|   |   ├── index.css
|   |   ├── main.jsx
|   |   ├── TaskCard.jsx
|   |   └── TaskCard.css
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── .gitignore
```

Note that there may be other files in the repo apart from the ones we have listed above, and that's fine. 

#### Well-formatted code is a must

Remember to format the code - maintain proper indentation and add relevant comments if required. This one is non-negotiable, as always.

## Automated review

Your submission will be reviewed automatically using a test script. The conditions mentioned above should be followed exactly to ensure that these tests can identify the required file and test the output.

If your submission gets rejected, before you make a resubmission, please go carefully through the feedback given, test locally and then resubmit on LMS. In case your submission is rejected more than a couple of times, and you cannot understand the reason even after going through the feedback, please ask for help on the **#wd-forum** channel of Pupilfirst School Discord server.

## Time required for review

This is the first of several targets in this course where your submitted work will be reviewed using automation.

In most cases, you should receive a review within a few minutes. However, in some cases, manual review may be required. Because of this, please wait at least 2 working days before asking for a review on Discord. Posts asking for a review before this period is over may be deleted without a response.

Have fun!