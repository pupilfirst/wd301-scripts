# Text

While we have created a working application in the previous levels, there are still a few important learnings left for working with React. The following few lessons will deal with the best practices for working with React, and also provide you with options for choosing different libraries for different use cases when you create your own React applications.

We also have details regarding why a particular library was picked and used in the current project and what other library options you have, to try and implement in a React project you might want to develop in the future.

Routing is an essential part of any React application, enabling navigation between different views or pages. This lesson will explore various routing libraries available for React and discuss their features, advantages, and limitations. We will also dive deep into the reasons behind choosing React Router version 6 as the primary focus of our course!

## What is [React Router v6](https://reactrouter.com/en/main)

React Router is a widely adopted and community-supported routing library for React applications. It provides a declarative way to define and manage routes, making navigation seamless and intuitive. React Router version 6 (RR6) is the latest major release, offering several improvements over its predecessors. Here are some key features of React Router version 6:

- Declarative Routing: RR6 allows you to define routes using JSX syntax, making it easy to understand and maintain your application's routing structure.

- Route-Based Code Splitting: RR6 supports dynamic importing, enabling code splitting based on routes. This improves the performance of your application by loading only the necessary components for each route.

- Nested Routing: RR6 provides excellent support for nested routing, allowing you to build complex and hierarchical route structures.

- Parallel and Serial Navigation: RR6 introduces parallel and serial navigation, enabling you to navigate between routes in parallel or in a specific order. This feature enhances flexibility and control over your application's navigation flow.

React Router is also well-documented and has a large community of users and contributors.

## Other Routing Options

### [Reach Router](https://reach.tech/router/)

Reach Router is a lightweight routing library designed to be simple and easy to use. It provides a subset of the features of React Router, but it is still powerful enough for most applications.

Reach Router is also well-documented and has a growing community of users.

### [Wouter](https://www.npmjs.com/package/wouter)

Wouter is a new routing library designed to be simple and efficient. It is based on the React Router 4 API, but it has been rewritten from scratch to be more performant.

Wouter is still under development, but it has a lot of potential. It is worth considering if you are looking for a lightweight and performant routing library.

### [Next.js](https://nextjs.org/docs/pages/building-your-application/routing)

Next.js is a popular React framework that incorporates built-in routing capabilities. Although primarily known for server-side rendering, Next.js provides seamless integration of server-side and client-side rendering.

Next.js also automatically splits the code based on pages, improving the performance of your application by loading only the necessary components for each page.

Next.js also uses a file-based routing approach, where each file in the pages directory represents a route. This simplicity makes it easy to navigate and understand your application's routing structure.

## Comparison Table

| Feature             | React Router | Reach Router | Wouter       | Next.js |
| ------------------- | ------------ | ------------ | ------------ | ------- |
| Declarative routing | Yes          | Yes          | Yes          | Yes     |
| Nested routes       | Yes          | Yes          | Yes          | Yes     |
| Route parameters    | Yes          | Yes          | Yes          | Yes     |
| Route guards        | Yes          | Yes          | No           | Yes     |
| History API support | Yes          | Yes          | Yes          | Yes     |
| Documentation       | Good         | Good         | Good         | Good    |
| Community           | Large        | Growing      | Small        | Growing |
| Performance         | Good         | Good         | Excellent    | Good    |
| Size                | Light-weight | Light-weight | Light-weight | High    |

## Why React Router Version 6 is the Preferred Choice:

React Router version 6 stands out as a powerful and flexible routing solution for React applications.

It offers a robust set of features, excellent community support, and a declarative syntax that simplifies routing configuration.

While other libraries, such as Reach Router, Wouter, and Next.js, have their own strengths, React Router version 6's active development, comprehensive documentation, and dynamic importing capabilities make it an ideal choice for our course.

By mastering React Router version 6, you will equip yourselves with the necessary skills to build efficient and scalable React applications. See you in the next one!
