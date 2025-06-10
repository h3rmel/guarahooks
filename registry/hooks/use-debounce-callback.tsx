'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useDebounceCallback<
  Fn extends (...args: Parameters<Fn>) => void,
>(callback: Fn, delay: number = 500): (...args: Parameters<Fn>) => void {
  const callbackRef = useRef<typeof callback>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(
    (...args: Parameters<Fn>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
