'use client';

import { useEffect, useRef } from 'react';

export function useOnUnmount(callback: () => void): void {
  const fnRef = useRef(callback);

  fnRef.current = callback;

  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
}
