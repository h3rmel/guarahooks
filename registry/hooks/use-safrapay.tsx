'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseSafraPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseSafraPayReturn {
  safrapay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useSafraPay(
  options: UseSafraPayOptions = {},
): UseSafraPayReturn {
  const {
    scriptUrl = 'https://cdn.safrapay.com.br/safrapay.js',
    autoInit = true,
  } = options;

  const [safrapay, setSafraPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).SafraPay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load SafraPay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setSafraPay((window as any).SafraPay);
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

  return { safrapay, loading, error, init };
}
