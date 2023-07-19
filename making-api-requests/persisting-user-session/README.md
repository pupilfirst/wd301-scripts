# Text
In any web application, implementing user authentication and session management is a very crucial. 
A user session is a way to identify and keep track of a user's activity on the website. A common requirement for web applications, is to persist the user session across page reloads, or even when the user closes the browser. In this lesson, we will learn how to persist user sessions in ReactJs.

Before we dive into the implementation details, it's important to understand the difference between **Session Storage** and **Local Storage**.

Session Storage is a web storage API that allows us to store key-value pairs in the user's browser that are specific to a single browsing session. This means that the data stored in Session Storage will be cleared once the user closes the browser.

On the other hand, Local Storage is a web storage API that allows us to store key-value pairs in the user's browser that persist even after the browser is closed. This means that the data stored in Local Storage will be available across browsing sessions.

Now that we have a basic understanding of the storage APIs, let's move on to the implementation.

# Script
To implement user session in ReactJs, we will use the Local Storage API. We can store the user's authentication token in Local Storage, and then use it to authenticate the user on subsequent requests.

#### Step 1: Storing the Authentication Token
When the user logs in, we will store the authentication token in Local Storage. We can do this in our `SigninForm` component:
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
      
      // Dialogue: Extract the response body as JSON data
      const data = await response.json();

      // Dialogue: After successful signin, first we will save the token in localStorage
      localStorage.setItem('authToken', response.data.token);

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
Here, we are using the `setItem` method of the **Local Storage API** to store the authentication token with the key `authToken`.

We've to save the token after signup as well, so update the `handleSubmit` method in the `SignupForm` component and use the following snippet after successful signup:
```tsx
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  // ...
  try {
    // ...

    // extract the response body as JSON data
    const data = await response.json();

    // if successful, save the token in localStorage
    localStorage.setItem('authToken', data.token);
  } catch (error) {
    console.error('Sign-up failed:', error);
  }
  
}
```

#### Step 2: Retrieving the Authentication Token
Once we have stored the authentication token, we can retrieve it on subsequent requests. We can do this by using the following code:
```tsx
const authToken = localStorage.getItem('authToken');
```
Here, we are using the `getItem` method of the **Local Storage API** to retrieve the authentication token with the key authToken.

#### Step 2: Checking if the User is Authenticated
To check if the user is authenticated, we can simply use the `ProtectedRoute` component. There we will use the `authToken` to decide if a user is authenticated.

```tsx
// src/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}
```
Here, we are using the getItem method of the Local Storage API to retrieve the authentication token with the key `authToken`. We then use the `!!` operator to convert the value to a boolean.

Now the value of the `isAuth` constant will determine whether the user is authenticated or not. if not, then we are redirecting the user to the signin page.

To conclude, in this lesson, we learned how to persist user sessions in ReactJs using the Local Storage API. We saw how we can store the authentication token in Local Storage, retrieve it on subsequent requests. By persisting the user session, we can provide a seamless experience to our users and improve the overall usability of our web applications.

<!-- #### Step 3: Checking if the User is Authenticated
To check if the user is authenticated, we can simply check if the authentication token is present in Local Storage. We will do that in the `src/useAuth.js` file, here we will use `useEffect` hook to set the value of `isAuthenticated` in `AuthContext`.

```tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signin = () => setIsAuthenticated(true);
  const signout = () => setIsAuthenticated(false);
  const authContextValue = {
    isAuthenticated,
    signin,
    signout,
  };
  
  useEffect(() => {
    const isAuth = !!localStorage.getItem('authToken');
    setIsAuthenticated(isAuth)
  }, [])
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
```

Here, we are using the getItem method of the Local Storage API to retrieve the authentication token with the key `authToken`. We then use the `!!` operator to convert the value to a boolean.

Now the value of the `isAuth` constant will determine whether the user is authenticated or not. Then we can use `isAuthenticated` constant with React router to determine where to redirect our users. -->


