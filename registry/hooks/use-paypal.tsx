'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePayPalOptions {
  clientId: string;
  currency?: string;
  intent?: 'capture' | 'authorize' | 'tokenize';
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePayPalReturn {
  paypal: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  renderButtons: (config: any, selector: string | HTMLElement) => void;
}

export function usePayPal(options: UsePayPalOptions): UsePayPalReturn {
  const {
    clientId,
    currency = 'USD',
    intent = 'capture',
    scriptUrl = 'https://www.paypal.com/sdk/js',
    autoInit = true,
  } = options;

  const [paypal, setPayPal] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).paypal) {
      const script = document.createElement('script');
      const params = new URLSearchParams({
        'client-id': clientId,
        currency,
        intent,
      });
      script.src = `${scriptUrl}?${params.toString()}`;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
      });
    }
  }, [clientId, currency, intent, scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPayPal((window as any).paypal);
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

  const renderButtons = useCallback(
    (config: any, selector: string | HTMLElement) => {
      if (!paypal) throw new Error('PayPal SDK not initialized');
      const container =
        typeof selector === 'string'
          ? document.querySelector(selector)
          : selector;
      if (!container) throw new Error('Invalid container for PayPal buttons');
      paypal.Buttons(config).render(container as any);
    },
    [paypal],
  );

  return { paypal, loading, error, init, renderButtons };
}
