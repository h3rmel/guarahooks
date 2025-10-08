'use client';

import { useCallback, useMemo, useState } from 'react';

export type UseMapResult<K, V> = {
  map: Map<K, V>;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
  has: (key: K) => boolean;
  clear: () => void;
  reset: () => void;
  setValue: (newMap: Map<K, V>) => void;
  get: (key: K) => V | undefined;
  getAll: () => [K, V][];
};

export function useMap<K, V>(
  initialMap: Iterable<[K, V]> = [],
): UseMapResult<K, V> {
  const [map, setMap] = useState<Map<K, V>>(() => new Map(initialMap));
  const initial = useMemo(() => new Map(initialMap), [initialMap]);

  const setEntry = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const current = prev.get(key);
      if (prev.has(key) && current === value) return prev;
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const deleteEntry = useCallback((key: K) => {
    setMap((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const hasKey = useCallback((key: K) => map.has(key), [map]);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const reset = useCallback(() => {
    setMap(new Map(initial));
  }, [initial]);

  const setValue = useCallback((newMap: Map<K, V>) => {
    setMap(new Map(newMap));
  }, []);

  const get = useCallback((key: K) => map.get(key), [map]);

  const getAll = useCallback(() => Array.from(map.entries()), [map]);

  return {
    map,
    set: setEntry,
    delete: deleteEntry,
    has: hasKey,
    clear,
    reset,
    setValue,
    get,
    getAll,
  };
}
