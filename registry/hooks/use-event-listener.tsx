'use client';

import { RefObject, useEffect, useRef } from 'react';

// Types
type EventTarget = Window | Document | HTMLElement | null;

interface Props<
  K extends keyof WindowEventMap,
  T extends HTMLElement = HTMLElement,
> {
  eventName: K;
  handler: (event: WindowEventMap[K]) => void;
  element?: RefObject<T | null> | EventTarget;
  options?: boolean | AddEventListenerOptions;
}

/**
 * React hook for handling DOM event listeners with proper cleanup
 */
export function useEventListener<
  K extends keyof WindowEventMap,
  T extends HTMLElement = HTMLElement,
>({ eventName, handler, element = window, options }: Props<K, T>): void {
  // Create a ref that stores the handler
  const savedHandler = useRef(handler);

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the element to attach the listener to
    const targetElement: EventTarget =
      element && 'current' in element ? element.current : element;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) =>
      savedHandler.current(event);

    targetElement.addEventListener(
      eventName,
      eventListener as EventListener,
      options,
    );

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(
        eventName,
        eventListener as EventListener,
        options,
      );
    };
  }, [eventName, element, options]);
}
