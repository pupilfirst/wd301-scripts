# Text
In the previous lesson, we've learned to save the user session information in Local Storage. In this lesson, we will learn to save the logged-in user's details in Local Storage and later we will retrive that information to show in protected pages. Like we can show logged-in user's name in header. 

So to do that, 
### Step 1: first we have to store *User Data*, post signup or signin.
After a successful login, we will have access to the user's data, such as their name, email, and authentication token. We can store this data in an object and then convert it to a JSON string using JSON.stringify().
```tsx
const SigninForm: React.FC = () => {
  // ...
  // ...
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      
      // extract the response body as JSON data
      const data = await response.json();

      // Dialogue: After successful signin, first we will save the token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      ...
      ...
      ...
    </form>
  );
};  


```
Here, we are converting the `user` object (which contains user information), into a JSON string using `JSON.stringify()`. Then, we are  using `localStorage.setItem()` to store the JSON string in local storage with the key name `userData`.

We've to save the token after signup as well, so update the `handleSubmit` method in the `SignupForm` component and use `localStorage.setItem('userData', JSON.stringify(response.data))` there after successful signup.

### Step 2: Retrieve User Data
After storing the user's data in local storage, you can retrieve it anytime you need it by using `localStorage.getItem()` and then converting the JSON string back to an object using `JSON.parse()`.
```js
const userData = JSON.parse(localStorage.getItem('userData'));

console.log(userData.id); // "1"
console.log(userData.name); // "Avishek Jana"
console.log(userData.email); // "avishek@example.com"
```

### Step 3: Clear User Data after signout
If the user logs out or if their session expires, you should clear their data from local storage using `localStorage.removeItem()`.
```js
localStorage.removeItem('userData');
```

In conclude, saving the current user data in local storage after login is a crucial feature for any web application that requires user authentication. In React JS, we can easily store and retrieve user data from local storage using the localStorage API. By storing user data in local storage, we can persist user data even if the user refreshes the page or closes and reopens their browser. By implementing these steps, we can ensure that the user has a seamless experience while using the application, and their data is secure and easily accessible.