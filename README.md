# 🎣 React arrow key navigation hook

Have you ever implemented a dropdown or an autofill you wish could be keyboard
navigable? Of course you can use the tab keys, but that's not always what users
expect.

The React Arrow Key Navigation Hook is a lightweight React hook to add dom-based
arrow key navigation through any component.

## Usage

You may either use the React hook, or the DOM-based functions provided.

To enable keyboard navigation on links, buttons and input elements:

```js
import useArrowKeyNavigationHook from "react-arrow-key-navigation-hook";

function MyComponent() {
  const parentRef = useArrowKeyNavigationHook({ selectors: "a,button,input" });

  return <div ref={parentRef}>...</div>;
}
```

If you have specific requirements, you can adjust the selector to only operate
on specific class names or selectors of your choosing.

## Usage outside of React

You can use the functionality independently of React:

```js
import handleEvents from "react-arrow-key-navigation-hook/src/handleEvents";

const eventHandler = (event) => {
  handleEvents({
    event,
    parentNode: document.querySelector("myNode"),
    selectors: "a,button,input",
  });
};
document.addEventListener("keydown", eventHandler);
```
