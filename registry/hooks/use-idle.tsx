'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_EVENTS = [
  'keydown',
  'mousemove',
  'touchmove',
  'click',
  'scroll',
  'wheel',
] as const;

interface UseIdleOptions {
  events?: ReadonlyArray<(typeof DEFAULT_EVENTS)[number]>;
  initialState?: boolean;
}

export function useIdle(
  timeout: number = 1000,
  options?: UseIdleOptions,
): [boolean, () => void] {
  const { events = DEFAULT_EVENTS, initialState = true } = options || {};
  const [idle, setIdle] = useState<boolean>(initialState);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (!idle) return; // No need to reset if already idle
    setIdle(false);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIdle(true);
    }, timeout);
  }, [timeout, idle]);

  useEffect(() => {
    // Stable handler for listeners
    const handleEvents = () => {
      if (!idle) {
        // Only reset the timer, don't setIdle(false) if already active
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          setIdle(true);
        }, timeout);
        return;
      }
      setIdle(false);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setIdle(true);
      }, timeout);
    };

    events.forEach((event) => document.addEventListener(event, handleEvents));

    // Initialize timer
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIdle(true);
    }, timeout);

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleEvents),
      );
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [timeout, events.join(','), idle]);

  return [idle, reset];
}
