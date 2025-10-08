'use client';

import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useDidUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined;
  }, deps);
}
