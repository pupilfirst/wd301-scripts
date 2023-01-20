# Script

### Different ways to style

Inline CSS

	I don’t think anyone needs an introduction to inline CSS. This is the CSS styling sent to the element directly using the HTML or JSX. You can include a JavaScript object for CSS in React components, although there are a few restrictions such as camel casing any property names which contain a hyphen.


Regular CSS

	Regular CSS is a common approach, arguably one step better than inline CSS. The styles can be imported to any number of pages and elements unlike inline CSS, which is applied directly to the particular element. Normal CSS has several advantages, such as native browser support (it requires no dependencies), there’s no extra tooling to learn, and there’s no danger of vendor lock in.


CSS-in-JS

	CSS-in-JS is a technique which enables you to use JavaScript to style components. When this JavaScript is parsed, CSS is generated and attached into the DOM.

	There are several benefits to this approach. For example, the generated CSS is scoped by default, meaning that changes to the styles of a component won’t affect anything else outside that component. This helps prevent stylesheets picking up bloat as time goes by; if you delete a component, you automatically delete its CSS.

	- JSS

	- Styled-Components

CSS Modules

	If you’ve ever felt like the CSS global scope problem takes up most of your time when you have to find what a particular style does, or if getting rid of CSS files leaves you nervously wondering if you might break something somewhere else in the code base, I feel you.
CSS Modules solve this problem by making sure that all of the styles for a component are in one single place and apply only to that particular component. 


Material Design

	Material is a design system created by Google to help teams build high-quality digital experiences for Android, iOS and the web.


	Material is the metaphor
		Material Design is inspired by the physical world and its textures, including how they reflect light and cast shadows. Material surfaces reimagine the mediums of paper and ink.

	Components
		Material Components are interactive building blocks for creating a user interface, and include a built-in states system to communicate focus, selection, activation, error, hover, press, drag, and disabled states.


		Components cover a range of interface needs, including:
            * Display: Placing and organizing content using components like cards, lists, and sheets.
            * Navigation: Allowing users to move through the product using components like navigation drawers and tabs.
            * Actions: Allowing users to perform tasks using components such as the floating action button.
            * Input: Allowing users to enter information or make selections using components like text fields, chips, and selection controls.
            * Communication: Alerting users to key information and messages using components such as snackbars, banners, and dialogs.




