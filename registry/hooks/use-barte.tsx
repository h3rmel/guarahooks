'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseBarteOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseBarteReturn {
  barte: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useBarte(options: UseBarteOptions = {}): UseBarteReturn {
  const { scriptUrl = 'https://cdn.barte.com.br/barte.js', autoInit = true } =
    options;

  const [barte, setBarte] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Barte) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Barte SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setBarte((window as any).Barte);
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

  return { barte, loading, error, init };
}
