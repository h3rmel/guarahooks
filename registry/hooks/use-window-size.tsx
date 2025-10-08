'use client';

import { useEffect, useState } from 'react';

type UseWindowSizeOptions = {
  initialWidth?: number;
  initialHeight?: number;
  onChange?: (width: number, height: number) => void;
};

type WindowSize = {
  width: number;
  height: number;
};

export function useWindowSize(options: UseWindowSizeOptions = {}): WindowSize {
  const isBrowser = typeof window !== 'undefined';

  const {
    initialWidth = isBrowser ? window.innerWidth : 0,
    initialHeight = isBrowser ? window.innerHeight : 0,
    onChange,
  } = options;

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      if (onChange) {
        onChange(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call handler right away to update size on mount
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [onChange, isBrowser]);

  return windowSize;
}
