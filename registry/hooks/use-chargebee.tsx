'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseChargebeeOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseChargebeeReturn {
  chargebee: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useChargebee(
  options: UseChargebeeOptions = {},
): UseChargebeeReturn {
  const {
    scriptUrl = 'https://js.chargebee.com/v2/chargebee.js',
    autoInit = true,
  } = options;

  const [chargebee, setChargebee] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Chargebee) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load Chargebee SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setChargebee((window as any).Chargebee);
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

  return { chargebee, loading, error, init };
}
