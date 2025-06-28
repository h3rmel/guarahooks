'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseZoopOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseZoopReturn {
  zoop: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useZoop(options: UseZoopOptions = {}): UseZoopReturn {
  const {
    scriptUrl = 'https://static.zoop.com.br/zoop-sdk.js',
    autoInit = true,
  } = options;

  const [zoop, setZoop] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Zoop) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Zoop SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setZoop((window as any).Zoop);
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

  return { zoop, loading, error, init };
}
