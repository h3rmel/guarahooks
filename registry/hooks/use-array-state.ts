'use client';

import { useCallback, useMemo, useState } from 'react';

export type UseArrayStateResult<T> = {
  array: T[];
  length: number;
  push: (...items: T[]) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (...items: T[]) => void;
  insert: (index: number, ...items: T[]) => void;
  remove: (index: number) => void;
  removeWhere: (predicate: (item: T, index: number) => boolean) => void;
  update: (index: number, item: T) => void;
  updateWhere: (
    predicate: (item: T, index: number) => boolean,
    newItem: T,
  ) => void;
  clear: () => void;
  reset: () => void;
  setValue: (newArray: T[]) => void;
  filter: (predicate: (item: T, index: number) => boolean) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  reverse: () => void;
  map: <U>(transform: (item: T, index: number) => U) => U[];
  find: (predicate: (item: T, index: number) => boolean) => T | undefined;
  findIndex: (predicate: (item: T, index: number) => boolean) => number;
  includes: (item: T) => boolean;
  indexOf: (item: T) => number;
  slice: (start?: number, end?: number) => T[];
  isEmpty: boolean;
  first: T | undefined;
  last: T | undefined;
};

export interface UseArrayStateOptions<T> {
  /**
   * Initial array value
   */
  initialValue?: T[];
  /**
   * Callback called whenever the array changes
   */
  onChange?: (array: T[]) => void;
}

/**
 * Manages an array as a React state with built-in array manipulation methods
 * @param options - Configuration options for the hook
 * @returns Object with array state and manipulation methods
 */
export function useArrayState<T>(
  options: UseArrayStateOptions<T> = {},
): UseArrayStateResult<T> {
  const { initialValue = [], onChange } = options;

  const [array, setArray] = useState<T[]>(initialValue);
  const initialArray = useMemo(() => [...initialValue], [initialValue]);

  // Helper to update array and call onChange
  const updateArray = useCallback(
    (newArray: T[]) => {
      setArray(newArray);
      if (onChange) {
        onChange(newArray);
      }
    },
    [onChange],
  );

  // Array manipulation methods
  const push = useCallback(
    (...items: T[]) => {
      setArray((prev) => {
        const newArray = [...prev, ...items];
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const pop = useCallback(() => {
    let poppedItem: T | undefined;
    setArray((prev) => {
      if (prev.length === 0) return prev;
      const newArray = [...prev];
      poppedItem = newArray.pop();
      if (onChange) onChange(newArray);
      return newArray;
    });
    return poppedItem;
  }, [onChange]);

  const shift = useCallback(() => {
    let shiftedItem: T | undefined;
    setArray((prev) => {
      if (prev.length === 0) return prev;
      const newArray = [...prev];
      shiftedItem = newArray.shift();
      if (onChange) onChange(newArray);
      return newArray;
    });
    return shiftedItem;
  }, [onChange]);

  const unshift = useCallback(
    (...items: T[]) => {
      setArray((prev) => {
        const newArray = [...items, ...prev];
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const insert = useCallback(
    (index: number, ...items: T[]) => {
      setArray((prev) => {
        const newArray = [...prev];
        newArray.splice(index, 0, ...items);
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const remove = useCallback(
    (index: number) => {
      setArray((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const newArray = [...prev];
        newArray.splice(index, 1);
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const removeWhere = useCallback(
    (predicate: (item: T, index: number) => boolean) => {
      setArray((prev) => {
        const newArray = prev.filter((item, index) => !predicate(item, index));
        if (newArray.length !== prev.length && onChange) {
          onChange(newArray);
        }
        return newArray.length !== prev.length ? newArray : prev;
      });
    },
    [onChange],
  );

  const update = useCallback(
    (index: number, item: T) => {
      setArray((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        if (prev[index] === item) return prev;
        const newArray = [...prev];
        newArray[index] = item;
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const updateWhere = useCallback(
    (predicate: (item: T, index: number) => boolean, newItem: T) => {
      setArray((prev) => {
        const index = prev.findIndex(predicate);
        if (index === -1 || prev[index] === newItem) return prev;
        const newArray = [...prev];
        newArray[index] = newItem;
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const clear = useCallback(() => {
    setArray((prev) => {
      if (prev.length === 0) return prev;
      const newArray: T[] = [];
      if (onChange) onChange(newArray);
      return newArray;
    });
  }, [onChange]);

  const reset = useCallback(() => {
    setArray((prev) => {
      const newArray = [...initialArray];
      if (JSON.stringify(prev) === JSON.stringify(newArray)) return prev;
      if (onChange) onChange(newArray);
      return newArray;
    });
  }, [initialArray, onChange]);

  const setValue = useCallback(
    (newArray: T[]) => {
      setArray((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(newArray)) return prev;
        if (onChange) onChange(newArray);
        return newArray;
      });
    },
    [onChange],
  );

  const filter = useCallback(
    (predicate: (item: T, index: number) => boolean) => {
      setArray((prev) => {
        const newArray = prev.filter(predicate);
        if (newArray.length !== prev.length && onChange) {
          onChange(newArray);
        }
        return newArray.length !== prev.length ? newArray : prev;
      });
    },
    [onChange],
  );

  const sort = useCallback(
    (compareFn?: (a: T, b: T) => number) => {
      setArray((prev) => {
        const newArray = [...prev].sort(compareFn);
        if (JSON.stringify(prev) !== JSON.stringify(newArray) && onChange) {
          onChange(newArray);
        }
        return JSON.stringify(prev) !== JSON.stringify(newArray)
          ? newArray
          : prev;
      });
    },
    [onChange],
  );

  const reverse = useCallback(() => {
    setArray((prev) => {
      if (prev.length <= 1) return prev;
      const newArray = [...prev].reverse();
      if (onChange) onChange(newArray);
      return newArray;
    });
  }, [onChange]);

  // Read-only methods
  const map = useCallback(
    <U>(transform: (item: T, index: number) => U): U[] => {
      return array.map(transform);
    },
    [array],
  );

  const find = useCallback(
    (predicate: (item: T, index: number) => boolean): T | undefined => {
      return array.find(predicate);
    },
    [array],
  );

  const findIndex = useCallback(
    (predicate: (item: T, index: number) => boolean): number => {
      return array.findIndex(predicate);
    },
    [array],
  );

  const includes = useCallback(
    (item: T): boolean => {
      return array.includes(item);
    },
    [array],
  );

  const indexOf = useCallback(
    (item: T): number => {
      return array.indexOf(item);
    },
    [array],
  );

  const slice = useCallback(
    (start?: number, end?: number): T[] => {
      return array.slice(start, end);
    },
    [array],
  );

  // Computed properties
  const length = array.length;
  const isEmpty = length === 0;
  const first = length > 0 ? array[0] : undefined;
  const last = length > 0 ? array[length - 1] : undefined;

  return {
    array,
    length,
    push,
    pop,
    shift,
    unshift,
    insert,
    remove,
    removeWhere,
    update,
    updateWhere,
    clear,
    reset,
    setValue,
    filter,
    sort,
    reverse,
    map,
    find,
    findIndex,
    includes,
    indexOf,
    slice,
    isEmpty,
    first,
    last,
  };
}
