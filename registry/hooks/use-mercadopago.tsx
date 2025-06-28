'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseMercadoPagoOptions {
  publicKey: string;
  locale?: string;
  autoInit?: boolean;
}

export interface UseMercadoPagoReturn {
  mp: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  createCheckout: (preferenceId: string) => void;
}

export function useMercadoPago(
  options: UseMercadoPagoOptions,
): UseMercadoPagoReturn {
  const { publicKey, locale = 'en-US', autoInit = true } = options;
  const [mp, setMp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).MercadoPago) {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.async = true;
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }
  }, []);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      const instance = new (window as any).MercadoPago(publicKey, { locale });
      setMp(instance);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [publicKey, locale, loadScript]);

  useEffect(() => {
    if (autoInit) {
      init();
    }
  }, [autoInit, init]);

  const createCheckout = useCallback(
    (preferenceId: string) => {
      if (!mp) throw new Error('MercadoPago not initialized');
      mp.checkout({ preference: { id: preferenceId } });
    },
    [mp],
  );

  return { mp, loading, error, init, createCheckout };
}
