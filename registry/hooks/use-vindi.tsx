'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseVindiOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseVindiReturn {
  vindi: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (config?: any) => void;
}

export function useVindi(options: UseVindiOptions = {}): UseVindiReturn {
  const {
    scriptUrl = 'https://static.vindi.com.br/js/vindi-checkout.js',
    autoInit = true,
  } = options;

  const [vindi, setVindi] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Vindi) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Vindi SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setVindi((window as any).Vindi);
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
      if (!vindi) throw new Error('Vindi not initialized');
      if (vindi.openCheckout) {
        vindi.openCheckout(config);
      }
    },
    [vindi],
  );

  return { vindi, loading, error, init, openCheckout };
}
