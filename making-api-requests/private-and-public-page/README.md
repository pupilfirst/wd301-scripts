# Text
In this lesson, we will learn to use the session information stored in localStorage, to determine if a user should view a public page or a protected page.

# Script
In this lesson, we will use conditional rendering in React Router to show public and protected pages, based on user's authentication status.

To do that, we will update our `App` component, there I'll define a function called `RequireAuth`.
```tsx
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
```
This function is reading `isAuthenticated` status from `AuthContext`, and then redirecting the users to `/signin` page if a user is not authenticated.

Next, we will use `RequireAuth` with our routes. So in App component, we will update our routes like:
```tsx
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          {/*Dialogue: Here I'll use a new Dashboard component and wrap it with RequireAuth */}
          {/*Dialogue: This is make sure that our Dashboard component stays protected */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;

// Dialogue: For now I've to define the Dashboard component here, later he will make it a page.
const Dashboard = () => {
  return (
    <h1>Dashboard (protected)</h1>
  )
}
```

Time to validate if it's working or not.

> Action: test in browser.
> First try with /dashboard
> Then login
> Then visit /dashboard

So, as you can see, when I tried to access the `/dashboard` path before login, we got redirected to the login page. Once we've filled the login credentials and submitted the form, we got access to the `/dashboard` path.

So, we've successfully configured the public and private routes for our application. 

That's it for this lesson, see you in the next one.