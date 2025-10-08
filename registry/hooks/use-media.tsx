'use client';

import { useEffect, useState } from 'react';

const getInitialState = (query: string, defaultState?: boolean): boolean => {
  const isBrowser = typeof window !== 'undefined';

  if (!query || typeof query !== 'string') {
    throw new Error('useMedia: query should be a non-empty string.');
  }

  if (defaultState !== undefined) {
    return defaultState;
  }

  if (isBrowser) {
    return window.matchMedia(query).matches;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.',
    );
  }

  return false;
};

export function useMedia(query: string, defaultState?: boolean): boolean {
  const [state, setState] = useState<boolean>(() =>
    getInitialState(query, defaultState),
  );

  useEffect(() => {
    if (!query || typeof query !== 'string') {
      throw new Error('useMedia: query should be a non-empty string.');
    }

    let mounted = true;
    const mql = window.matchMedia(query);

    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener('change', onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return state;
}
