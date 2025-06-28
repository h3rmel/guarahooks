'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseAdyenOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseAdyenReturn {
  adyen: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useAdyen(options: UseAdyenOptions = {}): UseAdyenReturn {
  const {
    scriptUrl = 'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.33.0/adyen.js',
    autoInit = true,
  } = options;

  const [adyen, setAdyen] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).AdyenCheckout) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Adyen SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setAdyen((window as any).AdyenCheckout);
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

  return { adyen, loading, error, init };
}
