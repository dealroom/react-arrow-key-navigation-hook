function handleEnter({ event, currentIndex, activeElement }) {
  if (currentIndex === -1) return;

  activeElement.click();
  event.preventDefault();
}

function handleArrowKey({ event, currentIndex, availableElements }) {
  // If the focus isn't in the container, focus on the first thing
  if (currentIndex === -1) availableElements[0].focus();

  // Move the focus up or down
  let nextElement;
  if (event.key === "ArrowDown") {
    nextElement = availableElements[currentIndex + 1];
  }

  if (event.key === "ArrowUp") {
    nextElement = availableElements[currentIndex - 1];
  }

  nextElement && nextElement.focus();
  event.preventDefault();
}

/**
 * Implement arrow key navigation for the given parentNode
 * @param {object}  options
 * @param {Event}   options.e          Keydown event
 * @param {DOMNode} options.parentNode The parent node to operate on. Arrow keys won't navigate outside of this node
 * @param {String}  options.selectors  Selectors for elements we want to be able to key through
 */
export default function handleEvents({
  event,
  parentNode,
  selectors = "a,button,input",
}) {
  if(!parentNode) return;

  const key = event.key;
  if (!["ArrowUp", "ArrowDown", "Enter"].includes(key)) {
    return;
  }

  const activeElement = document.activeElement;

  // If we're not inside the container, don't do anything
  if (!parentNode.contains(activeElement)) return;

  // Get the list of elements we're allowed to scroll through
  const availableElements = parentNode.querySelectorAll(selectors);

  // No elements are available to loop through.
  if (!availableElements.length) return;

  // Which index is currently selected
  const currentIndex = Array.from(availableElements).findIndex(
    (availableElement) => availableElement === activeElement
  );

  if (key === "Enter") {
    handleEnter({ event, currentIndex, activeElement });
  }
  handleArrowKey({ event, currentIndex, availableElements });
}
