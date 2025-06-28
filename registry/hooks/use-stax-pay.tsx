'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseStaxPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseStaxPayReturn {
  stax: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function useStaxPay(options: UseStaxPayOptions = {}): UseStaxPayReturn {
  const { scriptUrl = 'https://js.staxpayments.com/stax.js', autoInit = true } =
    options;

  const [stax, setStax] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Stax) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Stax Pay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setStax((window as any).Stax);
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

  const openCheckout = useCallback(
    (config?: any) => {
      if (!stax) throw new Error('Stax Pay not initialized');
      if (stax.openCheckout) {
        stax.openCheckout(config);
      }
    },
    [stax],
  );

  return { stax, loading, error, init, openCheckout };
}
