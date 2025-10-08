'use client';

import { useCallback, useEffect, useRef } from 'react';

interface UseAbortControllerOptions {
  abortOnUnmount?: boolean;
}

interface UseAbortControllerReturn {
  controller: AbortController;
  signal: AbortSignal;
  aborted: boolean;
  abort: (reason?: string) => void;
  reset: () => void;
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export function useAbortController(
  options: UseAbortControllerOptions = {},
): UseAbortControllerReturn {
  const { abortOnUnmount = true } = options;

  const controllerRef = useRef<AbortController>(new AbortController());

  const abort = useCallback((reason?: string) => {
    if (!controllerRef.current.signal.aborted) {
      controllerRef.current.abort(reason);
    }
  }, []);

  const reset = useCallback(() => {
    if (!controllerRef.current.signal.aborted) {
      controllerRef.current.abort('Reset');
    }
    controllerRef.current = new AbortController();
  }, []);

  const abortableFetch = useCallback(
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      return fetch(input, {
        ...init,
        signal: controllerRef.current.signal,
      });
    },
    [],
  );

  // Abort on unmount if option is enabled
  useEffect(() => {
    const currentController = controllerRef.current;

    return () => {
      if (abortOnUnmount && !currentController.signal.aborted) {
        currentController.abort('Component unmounted');
      }
    };
  }, [abortOnUnmount]);

  return {
    controller: controllerRef.current,
    signal: controllerRef.current.signal,
    aborted: controllerRef.current.signal.aborted,
    abort,
    reset,
    fetch: abortableFetch,
  };
}
