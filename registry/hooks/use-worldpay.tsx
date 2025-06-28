'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseWorldPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseWorldPayReturn {
  worldpay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useWorldPay(
  options: UseWorldPayOptions = {},
): UseWorldPayReturn {
  const {
    scriptUrl = 'https://cdn.worldpay.com/v1/worldpay.js',
    autoInit = true,
  } = options;

  const [worldpay, setWorldPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Worldpay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load WorldPay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setWorldPay((window as any).Worldpay);
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

  return { worldpay, loading, error, init };
}
