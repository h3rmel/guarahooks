'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseGetnetOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseGetnetReturn {
  getnet: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useGetnet(options: UseGetnetOptions = {}): UseGetnetReturn {
  const {
    scriptUrl = 'https://payment.getnet.com.br/sdk/js',
    autoInit = true,
  } = options;

  const [getnet, setGetnet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Getnet) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Getnet SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setGetnet((window as any).Getnet);
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

  return { getnet, loading, error, init };
}
