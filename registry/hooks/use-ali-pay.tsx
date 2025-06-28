'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseAliPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseAliPayReturn {
  alipay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function useAliPay(options: UseAliPayOptions = {}): UseAliPayReturn {
  const {
    scriptUrl = 'https://a.alipayobjects.com/g/tripoli/tripoli.js',
    autoInit = true,
  } = options;

  const [alipay, setAliPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).AlipayJSBridge) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load AliPay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setAliPay((window as any).AlipayJSBridge);
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
      if (!alipay) throw new Error('AliPay not initialized');
      if (alipay.tradePay) {
        alipay.tradePay(config);
      }
    },
    [alipay],
  );

  return { alipay, loading, error, init, openCheckout };
}
