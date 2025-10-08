'use client';

import { useCallback, useMemo, useState } from 'react';

export type UseSetResult<T> = {
  set: Set<T>;
  add: (item: T) => void;
  delete: (item: T) => void;
  has: (item: T) => boolean;
  clear: () => void;
  reset: () => void;
  setValue: (newSet: Set<T>) => void;
  getAll: () => T[];
};

export function useSet<T>(initialSet: Iterable<T> = []): UseSetResult<T> {
  const [set, setSet] = useState<Set<T>>(() => new Set(initialSet));
  const initial = useMemo(() => new Set(initialSet), [initialSet]);

  const add = useCallback((item: T) => {
    setSet((prev) => {
      if (prev.has(item)) return prev;
      const next = new Set(prev);
      next.add(item);
      return next;
    });
  }, []);

  const deleteItem = useCallback((item: T) => {
    setSet((prev) => {
      if (!prev.has(item)) return prev;
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  }, []);

  const has = useCallback((item: T) => set.has(item), [set]);

  const clear = useCallback(() => {
    setSet(new Set());
  }, []);

  const reset = useCallback(() => {
    setSet(new Set(initial));
  }, [initial]);

  const setValue = useCallback((newSet: Set<T>) => {
    setSet(new Set(newSet));
  }, []);

  const getAll = useCallback(() => Array.from(set), [set]);

  return {
    set,
    add,
    delete: deleteItem,
    has,
    clear,
    reset,
    setValue,
    getAll,
  };
}
