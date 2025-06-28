'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePicPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePicPayReturn {
  picpay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function usePicPay(options: UsePicPayOptions = {}): UsePicPayReturn {
  const {
    scriptUrl = 'https://static.picpay.com.br/picpay.min.js',
    autoInit = true,
  } = options;

  const [picpay, setPicPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).PicPay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PicPay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPicPay((window as any).PicPay);
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

  return { picpay, loading, error, init };
}
