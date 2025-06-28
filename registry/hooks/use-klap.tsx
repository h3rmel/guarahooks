'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseKlapOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseKlapReturn {
  klap: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useKlap(options: UseKlapOptions = {}): UseKlapReturn {
  const { scriptUrl = 'https://klap.app/klap.js', autoInit = true } = options;

  const [klap, setKlap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Klap) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Klap SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setKlap((window as any).Klap);
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

  return { klap, loading, error, init };
}
