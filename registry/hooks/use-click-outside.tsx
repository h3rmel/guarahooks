'use client';

import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClickOutside: (event: MouseEvent | TouchEvent) => void,
) {
  const callbackRef = useRef(onClickOutside);
  useEffect(() => {
    callbackRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    function handleEvent(event: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (!el || !(event.target instanceof Node) || el.contains(event.target))
        return;
      callbackRef.current(event);
    }

    document.addEventListener('mousedown', handleEvent, true);
    document.addEventListener('touchstart', handleEvent, true);
    return () => {
      document.removeEventListener('mousedown', handleEvent, true);
      document.removeEventListener('touchstart', handleEvent, true);
    };
  }, []);
}
