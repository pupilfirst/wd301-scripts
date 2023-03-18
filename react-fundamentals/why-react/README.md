# Text
When React was first introduced, it fundamentally changed how JavaScript frameworks worked. Back in 2013 (when React was first released publicly), when other JavaScript frameworks (like Angular) were pushing the concept of MVC architecture to frontend, React chose a different approach and decided to isolate **view rendering** from the **model representation** and introduced a completely new architecture to the JavaScript front-end ecosystem. And that new architecture was so effective and easy to adapt, it became immensely popular among the developers. Because, not only it helped to build interactive user interfaces, but also improved the developer experience. 

So, let's learn more about, why use React rather than vanilla JavaScript?

# Script
So far, you've learned, how the request-response cycle works in a traditional website. You request a webpage by typing its URL into your web browser. Then browser sends a request for that webpage, the server responds with a HTML page which your browser renders. If you click a link on that HTML page to go to another page on the website, a new request is sent to the server to get that new page.

> Action: Show the cycle in presentation

This back-and-forth loading pattern between your browser (the client) and the server continues for every new page or resource you try to access on a website.

This typical approach to loading websites works just fine, but consider a very data-driven website. To load a full webpage for a small change in data would take more bandwidth, time and patience and it will create a poor user experience.

Additionally, if you are using traditional JavaScript in an application, and the data changes, it requires manual DOM manipulation to reflect those changes.

React takes a different approach by letting you build something called a **single-page application** (SPA). A single-page application loads only a single HTML document on the first request. Then, it updates the specific portion, content, or body of the webpage that needs updating using JavaScript.

This pattern is known as client-side routing because the client doesn’t have to reload the full webpage to get a new page each time a user makes a new request. Instead, React intercepts the request and only fetches and changes the sections that need changing without having to trigger a full page reload. This approach results in better performance and a more dynamic user experience.

> Action: Show this pattern in presentation

To build different sections of a webpage, React uses something called **Component**. Everything in React is a "Component". Components are reusable UIs which allow you to split the app into separate blocks that act independently of each other. 
Components are created using something called “JSX” or syntactic JavaScript. It is basically like declaring HTML content as consts, variables, functions, etc. You will learn more about Components and JSX in future lessons.
 
So, excited to dive-in? See you in the next lesson.

<!-- React relies on a something called **virtual DOM**, which is a copy of the actual DOM. React’s virtual DOM is immediately reloaded to reflect this new change whenever there is a change in the data state. After which, React compares the virtual DOM to the actual DOM to figure out what exactly has changed. You will learn more about virtual DOM in future lesson.

React then figures out the least expensive way to patch the actual DOM with that update without rendering the actual DOM. As a result, React’s components and UIs very quickly reflect the changes since you don’t have to reload an entire page every time something updates. -->


<!-- ## Should we use React?
Now, the main question arises in front of us is why one should use React. Let us take a quick look on the benefits of React. -->