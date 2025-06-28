'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseCelcoinOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseCelcoinReturn {
  provider: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useCelcoin(options: UseCelcoinOptions = {}): UseCelcoinReturn {
  const {
    scriptUrl = 'https://static.celcoin.com.br/sdk.js',
    autoInit = true,
  } = options;

  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any)['Celcoin']) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Celcoin SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setProvider((window as any)['Celcoin']);
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

  return { provider, loading, error, init };
}
