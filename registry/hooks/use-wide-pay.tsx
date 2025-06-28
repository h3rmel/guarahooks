'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseWidePayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseWidePayReturn {
  widepay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function useWidePay(options: UseWidePayOptions = {}): UseWidePayReturn {
  const { scriptUrl = 'https://cdn.widepay.com/client.js', autoInit = true } =
    options;

  const [widepay, setWidePay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).WidePay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Wide Pay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setWidePay((window as any).WidePay);
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
      if (!widepay) throw new Error('Wide Pay not initialized');
      if (widepay.openCheckout) {
        widepay.openCheckout(config);
      }
    },
    [widepay],
  );

  return { widepay, loading, error, init, openCheckout };
}
