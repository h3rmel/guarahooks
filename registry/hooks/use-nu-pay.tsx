'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseNuPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseNuPayReturn {
  nupay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useNuPay(options: UseNuPayOptions = {}): UseNuPayReturn {
  const {
    scriptUrl = 'https://assets.nubank.com.br/nupay.js',
    autoInit = true,
  } = options;

  const [nupay, setNuPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).NuPay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load NuPay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setNuPay((window as any).NuPay);
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

  return { nupay, loading, error, init };
}
