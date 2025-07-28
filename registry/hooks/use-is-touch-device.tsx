'use client';

import { useEffect, useState } from 'react';

interface UseIsTouchDeviceReturn {
  isTouchable: boolean;
}

export function useIsTouchDevice(): UseIsTouchDeviceReturn {
  const [isTouchable, setIsTouchable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    // Check for touch support using multiple methods for better compatibility
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // Legacy support for older browsers
      ('msMaxTouchPoints' in navigator &&
        (navigator as any).msMaxTouchPoints > 0);

    setIsTouchable(hasTouch);
  }, []);

  return {
    isTouchable,
  };
}
