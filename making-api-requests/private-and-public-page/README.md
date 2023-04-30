# Text
In this lesson, we will learn to use the session information stored in localStorage, to determine if a user should view a public page or a protected page.

# Script
In this lesson, we will use conditional rendering in React Router to show public and protected pages, based on user's authentication status.

First, we will create a dashboard page, and then we will configure it to be a protected page.

For that, let's create a new `src/pages/dashboard/index.tsx` file with the following content:
```tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
    </div>
  );
}

export default Dashboard;
```

Next, we will import the Dashboard page in our App component, i.e. *src/App.tsx* file.
```tsx
import { ProtectedRoute } from "./ProtectedRoute";
import Signup from './pages/signup';
import Signin from "./pages/signin";
import Dashboard from "./pages/dashboard"
...
...
```

Then, we will the `ProtectedRoute` to configure the `dashboard` path as a protected route:
```tsx
...
...
...
const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<ProtectedRoute element={ <Dashboard/> } />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </div>
  );
}

export default App;
```

Time to validate if it's working or not.

> Action: Open http://localhost:3000 in browser.
> First try with /dashboard
> Then login
> Then visit /dashboard

So, as you can see, when I tried to access the `/dashboard` path before login, we got redirected to the login page. Once we've filled the login credentials and submitted the form, we got access to the `/dashboard` path.

So, we've successfully configured the public and private routes for our application. 

That's it for this lesson, see you in the next one.