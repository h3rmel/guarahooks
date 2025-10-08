'use client';

import { useEffect, useState } from 'react';

export type Orientation = 'portrait' | 'landscape';

function getOrientation(win?: typeof window): Orientation {
  if (!win) return 'portrait'; // Default for SSR
  return win.matchMedia('(orientation: portrait)').matches
    ? 'portrait'
    : 'landscape';
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() =>
    getOrientation(typeof window !== 'undefined' ? window : undefined),
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(orientation: portrait)');

    // Handler for orientation changes
    const handler = () => setOrientation(getOrientation(window));

    // Prefer addEventListener, fallback to addListener for older browsers
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else {
      mql.addListener(handler);
    }

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, []);

  return orientation;
}
