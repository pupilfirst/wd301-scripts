In the next two lessons, we will enhance the visual appeal of our Smarter Tasks application using TailwindCSS and [headlessUI](https://headlessui.com/).

headlessUI is a powerful library of UI components that simplifies the development process by providing pre-built components with built-in JavaScript functionality. These components, such as dialogues and dropdowns, come with ready-to-use logic, eliminating the need for us to write the code from scratch. While headlessUI offers a limited set of components on their website, we will find that it includes everything necessary to elevate the user experience of our Smarter Tasks application.

### Step 1: Install and configure headlessUI

In our project, we already have the TailwindCSS installed and configured. Next, we have to install headlessUI in our project. For that, we will run the following command in our terminal (of course inside our `smarter-tasks` project folder):

```sh
npm install @headlessui/react --save
```

Then,

### Step 2: Install heroicons library

In our project, we will integrate the [heroicons](https://heroicons.com/) library to enhance the visual representation of icons. Heroicons provides a wide range of beautifully designed icons that can be easily integrated into our application. To install heroicons, we will run the following command in the terminal:

```sh
npm install @heroicons/react --save
```

## Design the layouts

Next, we will focus on designing the layout for logged-in users. Once a user logs in to our application, we want to provide them with a user-friendly and consistent navigation experience. We will create a _navbar_ at the top of the page, featuring links to important sections such as projects, members, and the profile page.

To ensure consistency across all pages, we will encapsulate this _navbar_ within a layout component. The layout component will serve as a container for the common elements shared by all pages that logged-in users have access to. By keeping these elements in the layout component, we avoid duplicating code and make it easier to maintain and update the user interface.

### Step 1: Define the layout

For that, we will create a `layouts` folder inside our `src` directory.

> Create the `layouts` folder.

Next, inside the `layouts` folder, we will create another folder named `account` to keep the account layout files.

> Create the `account` folder.

Then, inside the `account` folder we will create a `index.tsx` file, where we will define the `AccountLayout` component.

```tsx
import * as React from "react";

const AccountLayout = () => {
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/*Route specific contents will come here*/}
      </div>
    </main>
  );
};

export default AccountLayout;
```

### Step 2: Let's design the Appbar component

Next, we will design a _navbar_ or _appbar_ for our account layout. For that, I've simply checked the TailwindCSS components, and there I've found [a basic navbar design](https://tailwindui.com/components/application-ui/navigation/navbars), and I think that's sufficient for us.

> Action: Open the URL. Then we will use the very first navbar. On right hand side, select React and check the code.

So, we will copy the whole code, and then we will do some adjustments based on our requirements.
For that, we will create a `Appbar.tsx` file inside the `src/layouts/account` folder, and paste the code here.

And then we will change the contents, as per our design:

```tsx
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const { pathname } = useLocation();

  const navigation = [
    { name: "Projects", href: "/account/projects", current: false },
    { name: "Members", href: "/account/members", current: false },
  ];

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8" src={Logo} alt="Smarter Tasks" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = pathname.includes(item.href);

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-slate-50 text-blue-700"
                              : "text-slate-500 hover:text-blue-600",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
```

So here,

1. First, I've kept a logo for our application, in the `src/assets/images` folder,

![logo](./logo.png)

Then I've imported it here in this `Appbar` component

```tsx
import Logo from "../../assets/images/logo.png";
```

2. Then I've defined the user navigation links

```js
const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];
```

And then I've used these links on the right-hand side of the `navbar`.

3. Then we've defined the primary links for logged-in users

```js
const navigation = [
  { name: "Projects", href: "/account/projects", current: false },
  { name: "Members", href: "/account/members", current: false },
];
```

4. And finally, to add some styling for the currently active link, I've used the `useLocation()` hook from the `react-router-dom` library.

### Step 3: Import Appbar in the layout

Next, we will import and use the `Appbar` component in our `AccountLayout` component.

```tsx
import * as React from "react";
import Appbar from "./Appbar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/*Route specific contents will come here*/}
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
```

### Step 4: Finding a way to show contents of child component

Now our account layout is almost ready, but it has one problem. We haven't defined how the route specific contents will show up here. This means we have to give a placeholder for rendering child components.

And for that, we will use a special component called, `Outlet` from the `react-router-dom` library. `Outlet` is primarily used in nested route configurations to define the location where child components should be rendered.

So, first we will simply import `Outlet` from the `react-router-dom` library.

```tsx
import * as React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
```

Then we've simply used `Outlet` inside the `main`.

And that's it, we've successfully configured our account layout.
