# Text

# Checklist - Verification

## Packaging and Bundling
- [ ] *(Verify by analyzing the network requests and ensuring only required chunks are loaded using Chrome Network Tab.)*
- [ ] *(Verify by checking if some of these items are served from a CDN using Chrome Network Tab.)*

## Application Performance
- [ ] *(Verify by using React DevTools to check for optimized rendering and updates.)*
- [ ] *(Verify by measuring the performance of data-intensive operations and ensuring they are optimized. Check the quality of the filtering implementation)*
- [ ] *(Verify by running the application lighthouse audit validating performance issues.)*

## Security Considerations
- [ ] *(Verify by attempting unauthorized access and ensuring it's restricted.)*
- [ ] *(Verify by testing with malicious inputs/invalid inputs for form fields on Signin and Signup and ensuring they are handled correctly.)*
- [ ] *(Verify by inspecting network requests and ensuring they use HTTPS. Check if the application is served over HTTPS.)*

## Browser Compatibility
- [ ] *(Verify by testing on different browsers (Chrome, Firefox and Edge) and confirming consistent functionality.)*

## User Experience (UX)
- [ ] *(Verify by testing on various devices sizes to ensure some amount of responsiveness using Chrome console.)*
- [ ] *(Verify by measuring load times and interactions to ensure a smooth experience through Lighthouse audits.)*
- [ ] *(Verify by checking design elements and navigation for consistency. Similar color schemes, Fluent UI etc.,)*
- [ ] *(Verify by triggering errors and validating the feedback provided to users.)*

## Progressive Web App (PWA)
- [ ] *(Verify by testing the app offline and confirming cached assets are used through Chrome console Offline mode.)*
- [ ] *(Verify by inspecting the manifest file and checking for required properties through Chrome console.)*
- [ ] *(Verify by installing the app and ensuring it behaves like a standalone application.)*
