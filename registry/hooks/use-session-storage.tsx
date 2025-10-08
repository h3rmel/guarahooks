'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseSessionStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

/**
 * Hook to synchronize a value with sessionStorage in a type-safe, performant, and cross-tab reactive way.
 *
 * @param key sessionStorage key
 * @param initialValue Initial value
 * @param options Custom serialization/deserialization functions
 */
function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: UseSessionStorageOptions<T>,
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
      const item = window.sessionStorage.getItem(key);

      return item != null ? (deserialize(item) as T) : initialRef.current;
    } catch (error) {
      console.warn(
        `[useSessionStorage] Error reading key "${key}" from sessionStorage:`,
        error,
      );

      return initialRef.current;
    }
  }, [key, deserialize]);

  // State synchronized with sessionStorage
  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;

          window.sessionStorage.setItem(key, serialize(valueToStore));

          return valueToStore;
        });
      } catch (error) {
        console.warn(
          `[useSessionStorage] Error setting key "${key}" in sessionStorage:`,
          error,
        );
      }
    },
    [key, serialize],
  );

  // Synchronize between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea === window.sessionStorage && event.key === key) {
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

export default useSessionStorage;
