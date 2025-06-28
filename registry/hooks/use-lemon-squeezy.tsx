'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseLemonSqueezyOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseLemonSqueezyReturn {
  lemon: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  openCheckout: (url: string) => void;
}

export function useLemonSqueezy(
  options: UseLemonSqueezyOptions = {},
): UseLemonSqueezyReturn {
  const {
    scriptUrl = 'https://app.lemonsqueezy.com/js/lemon.js',
    autoInit = true,
  } = options;

  const [lemon, setLemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).LemonSqueezy) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load LemonSqueezy SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setLemon((window as any).LemonSqueezy);
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
    (url: string) => {
      if (!lemon) throw new Error('LemonSqueezy not initialized');
      lemon.open({ checkout: url });
    },
    [lemon],
  );

  return { lemon, loading, error, init, openCheckout };
}
