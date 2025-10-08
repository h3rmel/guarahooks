'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseLocalStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

/**
 * Hook to synchronize a value with localStorage in a type-safe, performant, and cross-tab reactive way.
 *
 * @param key localStorage key
 * @param initialValue Initial value
 * @param options Custom serialization/deserialization functions
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>,
) {
  // Memoize serialize/deserialize to avoid unnecessary dependencies
  const serialize = useMemo(
    () => options?.serialize ?? JSON.stringify,
    [options?.serialize],
  );

  const deserialize = useMemo(
    () => options?.deserialize ?? JSON.parse,
    [options?.deserialize],
  );

  // Ref to keep the initial value stable
  const initialRef = useRef(initialValue);

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialRef.current;

    try {
      const item = window.localStorage.getItem(key);

      return item != null ? (deserialize(item) as T) : initialRef.current;
    } catch (error) {
      console.warn(
        `[useLocalStorage] Error reading key "${key}" from localStorage:`,
        error,
      );

      return initialRef.current;
    }
  }, [key, deserialize]);

  // State synchronized with localStorage
  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;

          window.localStorage.setItem(key, serialize(valueToStore));

          return valueToStore;
        });
      } catch (error) {
        console.warn(
          `[useLocalStorage] Error setting key "${key}" in localStorage:`,
          error,
        );
      }
    },
    [key, serialize],
  );

  // Synchronize between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [key, readValue]);

  // Update the value if the key changes
  useEffect(() => {
    setStoredValue(readValue());
  }, [key, readValue]);

  return [storedValue, setValue] as const;
}
