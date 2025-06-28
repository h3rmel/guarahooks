'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseAbacatePayOptions {
  publicKey: string;
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseAbacatePayReturn {
  abacate: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (sessionId: string) => void;
  getStatus: (paymentId: string) => Promise<any>;
}

export function useAbacatePay(
  options: UseAbacatePayOptions,
): UseAbacatePayReturn {
  const {
    publicKey,
    scriptUrl = 'https://cdn.abacatepay.com/sdk.js',
    autoInit = true,
  } = options;

  const [abacate, setAbacate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).AbacatePay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      const instance = new (window as any).AbacatePay(publicKey);
      setAbacate(instance);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [publicKey, loadScript]);

  useEffect(() => {
    if (autoInit) {
      init();
    }
  }, [autoInit, init]);

  const openCheckout = useCallback(
    (sessionId: string) => {
      if (!abacate) throw new Error('AbacatePay not initialized');
      abacate.openCheckout(sessionId);
    },
    [abacate],
  );

  const getStatus = useCallback(
    async (paymentId: string) => {
      if (!abacate) throw new Error('AbacatePay not initialized');
      return abacate.getStatus(paymentId);
    },
    [abacate],
  );

  return { abacate, loading, error, init, openCheckout, getStatus };
}
