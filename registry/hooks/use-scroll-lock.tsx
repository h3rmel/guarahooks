'use client';

import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface UseScrollLockReturn {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
}

export function useScrollLock<T extends HTMLElement = HTMLElement>(
  ref?: RefObject<T> | MutableRefObject<T | null>,
): UseScrollLockReturn {
  const refCached = useRef<
    RefObject<T> | MutableRefObject<T | null> | undefined
  >(ref);

  useEffect(() => {
    refCached.current = ref;
  }, [ref]);

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const originalOverflow = useRef<string>('');

  const getTarget = useCallback((): HTMLElement => {
    const currentRef = refCached.current;
    const el = currentRef?.current ?? null;
    return (el as HTMLElement) || document.body;
  }, []);

  const lock = useCallback(() => {
    if (!isLocked) {
      const target = getTarget();
      originalOverflow.current = target.style.overflow;
      target.style.overflow = 'hidden';
      setIsLocked(true);
    }
  }, [getTarget, isLocked]);

  const unlock = useCallback(() => {
    if (isLocked) {
      const target = getTarget();
      target.style.overflow = originalOverflow.current;
      setIsLocked(false);
    }
  }, [getTarget, isLocked]);

  const toggle = useCallback(() => {
    isLocked ? unlock() : lock();
  }, [isLocked, lock, unlock]);

  // Restore on unmount
  useEffect(() => {
    return () => {
      const target = getTarget();
      target.style.overflow = originalOverflow.current;
    };
  }, [getTarget]);

  return { isLocked, lock, unlock, toggle };
}
