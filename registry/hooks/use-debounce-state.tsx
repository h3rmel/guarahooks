'use client';

import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface UseDebouncedStateOptions {
  leading?: boolean;
}

export function useDebouncedState<T>(
  defaultValue: T,
  delay: number = 500,
  options: UseDebouncedStateOptions = {},
) {
  const [value, setValue] = useState<T>(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadingRef = useRef(true);

  const clearDebounceTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearDebounceTimeout();
    };
  }, [clearDebounceTimeout]);

  useEffect(() => {
    leadingRef.current = true;
  }, [defaultValue]);

  const debouncedSetValue = useCallback(
    (newValue: SetStateAction<T>) => {
      clearDebounceTimeout();
      if (leadingRef.current && options.leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, delay);
      }
      leadingRef.current = false;
    },
    [clearDebounceTimeout, delay, options.leading],
  );

  return [value, debouncedSetValue] as const;
}
