# Script
In this video, we are going to create a user signup form. So, when someone new comes to our Smarter Tasks application, they should see a link to signup. When we click on the signup link, we should take them to the signup form, where they have to fill some details like:  organisation name, his/her name,  email and password. Then, when they click on the signup button, it should call our API service to create the user account. Let's start.

First, we will start with the signup form, For that we will create a new `Signup` component.
```jsx
const Signup = (props) => {
  return (
    <form>
      <input name="organisationName" type="text" />
      <input name="userName" type="text" />
      <input name="userEmail" type="email" />
      <input name="userPassword" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Then we will add this to our `App` component
```jsx
import Signup from "./Signup"

const App = () => {
  return (
    <div>
      <Signup />
    </div>
  )
}
```