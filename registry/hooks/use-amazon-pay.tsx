'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseAmazonPayOptions {
  merchantId: string;
  publicKeyId?: string;
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseAmazonPayReturn {
  amazon: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  renderButton: (selector: string, options?: any) => void;
}

export function useAmazonPay(options: UseAmazonPayOptions): UseAmazonPayReturn {
  const {
    merchantId,
    publicKeyId,
    scriptUrl = 'https://static-na.payments-amazon.com/checkout.js',
    autoInit = true,
  } = options;

  const [amazon, setAmazon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).amazon) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load Amazon Pay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setAmazon((window as any).amazon);
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

  const renderButton = useCallback(
    (selector: string, opts?: any) => {
      if (!amazon) throw new Error('Amazon Pay not initialized');
      const container = document.querySelector(selector);
      if (!container) throw new Error('Invalid container');
      amazon.Pay.renderButton(container, {
        merchantId,
        publicKeyId,
        ...opts,
      });
    },
    [amazon, merchantId, publicKeyId],
  );

  return { amazon, loading, error, init, renderButton };
}
