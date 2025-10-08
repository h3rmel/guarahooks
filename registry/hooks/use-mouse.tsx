'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';

export type UseMouseOptions = {
  ref: RefObject<HTMLElement>;
  trackOutside?: boolean;
  clampToZero?: boolean;
};

/**
 * Data returned by the useMouse hook
 *
 * @property docX - Mouse X position in the document (pageX)
 * @property docY - Mouse Y position in the document (pageY)
 * @property posX - Element X position on the page (relative to document)
 * @property posY - Element Y position on the page (relative to document)
 * @property elX - Mouse X position relative to the element
 * @property elY - Mouse Y position relative to the element
 * @property elH - Element height
 * @property elW - Element width
 */
type MouseData = {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
};

export function useMouse({
  ref,
  trackOutside = false,
  clampToZero = false,
}: UseMouseOptions): MouseData {
  if (process.env.NODE_ENV === 'development') {
    if (!ref?.current) {
      console.error(
        'useMouse: ref is required and must point to an HTMLElement!',
      );
    }
  }

  const [state, setState] = useState<MouseData>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  const moveHandler = useCallback(
    (event: MouseEvent) => {
      if (ref && ref.current) {
        const {
          left,
          top,
          width: elW,
          height: elH,
        } = ref.current.getBoundingClientRect();
        const posX = left + window.pageXOffset;
        const posY = top + window.pageYOffset;
        let elX = event.pageX - posX;
        let elY = event.pageY - posY;

        // Clamps elX/elY to >= 0 if clampToZero
        if (clampToZero) {
          elX = Math.max(0, elX);
          elY = Math.max(0, elY);
        }

        // If not tracking outside the element, only update if the mouse is inside
        const isInside =
          event.pageX >= posX &&
          event.pageX <= posX + elW &&
          event.pageY >= posY &&
          event.pageY <= posY + elH;

        if (trackOutside || isInside) {
          const nextState: MouseData = {
            docX: event.pageX,
            docY: event.pageY,
            posX,
            posY,
            elX,
            elY,
            elH,
            elW,
          };

          // Updates only if some value has changed
          setState((prev) => {
            for (const key in nextState) {
              if (
                nextState[key as keyof MouseData] !==
                prev[key as keyof MouseData]
              ) {
                return nextState;
              }
            }
            return prev;
          });
        }
      }
    },
    [ref, trackOutside, clampToZero],
  );

  useEffect(() => {
    document.addEventListener('mousemove', moveHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
    };
  }, [moveHandler]);

  return state;
}
