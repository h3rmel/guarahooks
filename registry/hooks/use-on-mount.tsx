'use client';

import { useEffect, useRef } from 'react';

export function useOnMount(callback: () => void): void {
  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current) {
      callback();
      calledRef.current = true;
    }
  }, []);
}
