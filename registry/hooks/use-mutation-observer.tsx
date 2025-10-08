'use client';

import { useCallback, useEffect, useRef } from 'react';

// Types
type UseMutationObserverProps<T extends HTMLElement = HTMLElement> = {
  target: React.RefObject<T | null>;
  options?: MutationObserverInit;
  callback: MutationCallback;
};

export function useMutationObserver<T extends HTMLElement = HTMLElement>({
  target,
  options = {
    attributes: true,
    childList: true,
    subtree: true,
  },
  callback,
}: UseMutationObserverProps<T>) {
  const observerRef = useRef<MutationObserver | null>(null);
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

    observerRef.current = new MutationObserver(callback);
    observerRef.current.observe(node, options);
    return () => {
      disconnect();
    };
  }, [target, options, callback, disconnect]);

  return {
    disconnect,
  };
}
