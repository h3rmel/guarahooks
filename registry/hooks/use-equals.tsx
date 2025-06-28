'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseEqualsOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseEqualsReturn {
  equals: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useEquals(options: UseEqualsOptions = {}): UseEqualsReturn {
  const { scriptUrl = 'https://cdn.equals.com/equals.js', autoInit = true } =
    options;

  const [equals, setEquals] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).EqualsPay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Equals SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setEquals((window as any).EqualsPay);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [loadScript]);

  useEffect(() => {
    if (autoInit) {
      init();
    }
  }, [autoInit, init]);

  return { equals, loading, error, init };
}
