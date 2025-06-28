'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseDripOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseDripReturn {
  drip: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useDrip(options: UseDripOptions = {}): UseDripReturn {
  const { scriptUrl = 'https://cdn.drip.com/js/drip.js', autoInit = true } =
    options;

  const [drip, setDrip] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Drip) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Drip SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setDrip((window as any).Drip);
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

  return { drip, loading, error, init };
}
