'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseCieloOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseCieloReturn {
  cielo: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useCielo(options: UseCieloOptions = {}): UseCieloReturn {
  const {
    scriptUrl = 'https://assets.cielo.com.br/cielo.min.js',
    autoInit = true,
  } = options;

  const [cielo, setCielo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Cielo) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Cielo SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setCielo((window as any).Cielo);
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

  return { cielo, loading, error, init };
}
