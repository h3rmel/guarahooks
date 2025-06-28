'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePagBankOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePagBankReturn {
  pagbank: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openWidget: (token: string) => void;
}

export function usePagBank(options: UsePagBankOptions = {}): UsePagBankReturn {
  const {
    scriptUrl = 'https://assets.pagseguro.com.br/pgbank/js/pagbank.js',
    autoInit = true,
  } = options;

  const [pagbank, setPagBank] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).PagBank) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PagBank SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPagBank((window as any).PagBank);
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

  const openWidget = useCallback(
    (token: string) => {
      if (!pagbank) throw new Error('PagBank not initialized');
      pagbank.openWidget(token);
    },
    [pagbank],
  );

  return { pagbank, loading, error, init, openWidget };
}
