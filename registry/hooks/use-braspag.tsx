'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseBraspagOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseBraspagReturn {
  braspag: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useBraspag(options: UseBraspagOptions = {}): UseBraspagReturn {
  const {
    scriptUrl = 'https://mpg.braspag.com.br/braspag.js',
    autoInit = true,
  } = options;

  const [braspag, setBraspag] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Braspag) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Braspag SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setBraspag((window as any).Braspag);
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

  return { braspag, loading, error, init };
}
