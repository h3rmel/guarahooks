'use client';

import { useCallback, useEffect, useRef } from 'react';

// Types
interface UseResizeObserverProps<T extends Element = Element> {
  target: React.RefObject<T | null>;
  options?: ResizeObserverOptions;
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;
}

export function useResizeObserver<T extends Element = Element>({
  target,
  options,
  callback,
}: UseResizeObserverProps<T>) {
  const observerRef = useRef<ResizeObserver | null>(null);
  const prevTargetRef = useRef<T | null>(null);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const node = target.current;
    if (!node) return;

    if (prevTargetRef.current !== node) {
      disconnect();
      prevTargetRef.current = node;
    }

    observerRef.current = new ResizeObserver((entries, obs) => {
      callback(entries, obs);
    });

    observerRef.current.observe(node, options);

    return () => {
      disconnect();
    };
  }, [target, options, callback, disconnect]);

  return {
    disconnect,
  };
}
