'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePagSeguroOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePagSeguroReturn {
  pagseguro: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openLightbox: (code: string) => void;
}

export function usePagSeguro(
  options: UsePagSeguroOptions = {},
): UsePagSeguroReturn {
  const {
    scriptUrl = 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',
    autoInit = true,
  } = options;

  const [pagseguro, setPagSeguro] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).PagSeguroDirectPayment) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load PagSeguro SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPagSeguro((window as any).PagSeguroDirectPayment);
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

  const openLightbox = useCallback(
    (code: string) => {
      if (!pagseguro) throw new Error('PagSeguro not initialized');
      (window as any).PagSeguroLightbox({ code });
    },
    [pagseguro],
  );

  return { pagseguro, loading, error, init, openLightbox };
}
