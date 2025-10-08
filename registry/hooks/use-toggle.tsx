'use client';

import { useCallback, useState } from 'react';

export function useToggle(
  initialValue: boolean = false,
  onToggle?: (value: boolean) => void,
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => {
      const newValue = !prev;

      if (onToggle) {
        onToggle(newValue);
      }

      return newValue;
    });
  }, [onToggle]);

  return [value, toggle];
}
