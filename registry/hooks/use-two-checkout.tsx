'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseTwoCheckoutOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseTwoCheckoutReturn {
  twoCo: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function useTwoCheckout(
  options: UseTwoCheckoutOptions = {},
): UseTwoCheckoutReturn {
  const {
    scriptUrl = 'https://www.2checkout.com/checkout/api/script/main.js',
    autoInit = true,
  } = options;

  const [twoCo, setTwoCo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).TCO) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load 2Checkout SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setTwoCo((window as any).TCO);
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
      if (!twoCo) throw new Error('2Checkout not initialized');
      if (twoCo.load) {
        twoCo.load();
      }
      if (twoCo.process) {
        twoCo.process(config);
      }
    },
    [twoCo],
  );

  return { twoCo, loading, error, init, openCheckout };
}
