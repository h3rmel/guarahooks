'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseClearSaleOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseClearSaleReturn {
  clearsale: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useClearSale(
  options: UseClearSaleOptions = {},
): UseClearSaleReturn {
  const {
    scriptUrl = 'https://device.clearsale.com.br/scripts/anti-fraud.min.js',
    autoInit = true,
  } = options;

  const [clearsale, setClearSale] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).ClearSale) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load ClearSale SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setClearSale((window as any).ClearSale);
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

  return { clearsale, loading, error, init };
}
