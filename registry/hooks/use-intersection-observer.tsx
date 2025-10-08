'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {}

interface UseIntersectionObserverReturn<T extends Element = Element> {
  ref: (node: T | null) => void;
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn<T> {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (node) {
        observerRef.current = new IntersectionObserver(([entry]) => {
          setEntry(entry);
        }, options);

        observerRef.current.observe(node);
      } else {
        setEntry(null);
      }
    },
    [options],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isIntersecting = entry?.isIntersecting ?? false;

  return { ref, entry, isIntersecting };
}
