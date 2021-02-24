import handleEvents from "./handleEvents";
import { useRef, useEffect } from "react";

/**
 * A react hook to enable arrow key navigation on a component.
 * @param {*} param0
 * @returns a useRef, which can be applied to a component
 */
export default function useArrowKeyNavigation(props) {
  const { selectors } = props || {};
  const parentNode = useRef();

  useEffect(() => {
    const eventHandler = (event) => {
      handleEvents({ event, parentNode: parentNode.current, selectors });
    };
    document.addEventListener("keydown", eventHandler);
    return () => document.removeEventListener("keydown", eventHandler);
  }, []);

  return parentNode;
}
