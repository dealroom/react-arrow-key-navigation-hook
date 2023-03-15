import handleEvents from "./handleEvents";
import { useRef, useEffect } from "react";

type UseArrowKeyNavigationProps = {
  selectors: string;
};

/**
 * A react hook to enable arrow key navigation on a component.
 * @param {{selectors: string}} props
 * @returns a useRef, which can be applied to a component
 */
export default function useArrowKeyNavigation<T extends HTMLElement>({
  selectors,
}: UseArrowKeyNavigationProps) {
  const parentNode = useRef<T>(null);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      handleEvents({ event, parentNode: parentNode.current, selectors });
    };
    document.addEventListener("keydown", eventHandler);
    return () => document.removeEventListener("keydown", eventHandler);
  }, [selectors]);

  return parentNode;
}
