'use client';

import { useCallback, useEffect, useState } from 'react';

export type ScrollPosition = {
  x: number;
  y: number;
};

export type UseScrollPositionOptions = {
  onChange?: (x: number, y: number) => void;
};

export function useScrollPosition(
  options: UseScrollPositionOptions = {},
): ScrollPosition {
  const isBrowser = typeof window !== 'undefined';
  const { onChange } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: isBrowser ? window.scrollX : 0,
    y: isBrowser ? window.scrollY : 0,
  });

  const handleScroll = useCallback(() => {
    const x = window.scrollX;
    const y = window.scrollY;
    setScrollPosition({ x, y });
    if (onChange) {
      onChange(x, y);
    }
  }, [onChange]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize position on mount
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isBrowser]);

  return scrollPosition;
}
