'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UsePagarmeOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UsePagarmeReturn {
  pagarme: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  createCardHash: (card: any) => Promise<string>;
}

export function usePagarme(options: UsePagarmeOptions = {}): UsePagarmeReturn {
  const {
    scriptUrl = 'https://assets.pagar.me/pagarme-js/4.16/pagarme.min.js',
    autoInit = true,
  } = options;

  const [pagarme, setPagarme] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).pagarme) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pagar.me SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setPagarme((window as any).pagarme);
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

  const createCardHash = useCallback(
    async (card: any) => {
      if (!pagarme) throw new Error('Pagar.me not initialized');
      const client = await pagarme.client.connect({ encryption_key: card.key });
      return client.security.encrypt(card);
    },
    [pagarme],
  );

  return { pagarme, loading, error, init, createCardHash };
}
