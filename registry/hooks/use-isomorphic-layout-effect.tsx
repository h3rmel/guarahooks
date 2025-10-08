'use client';

import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from 'react';

export function useIsomorphicLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList,
): void {
  const isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';

  const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;

  useIsomorphicEffect(effect, deps);
}
