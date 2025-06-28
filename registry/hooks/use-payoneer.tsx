'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePayoneerOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePayoneerReturn {
  payoneer: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function usePayoneer(
  options: UsePayoneerOptions = {},
): UsePayoneerReturn {
  const {
    scriptUrl = 'https://checkout.payoneer.com/checkout.js',
    autoInit = true,
  } = options;

  const [payoneer, setPayoneer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Payoneer) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Payoneer SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPayoneer((window as any).Payoneer);
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
      if (!payoneer) throw new Error('Payoneer not initialized');
      if (payoneer.openCheckout) {
        payoneer.openCheckout(config);
      }
    },
    [payoneer],
  );

  return { payoneer, loading, error, init, openCheckout };
}
