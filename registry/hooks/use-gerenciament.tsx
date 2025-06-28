'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseGerenciamentOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseGerenciamentReturn {
  provider: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useGerenciament(
  options: UseGerenciamentOptions = {},
): UseGerenciamentReturn {
  const { scriptUrl = 'https://cdn.gerenciament.com/sdk.js', autoInit = true } =
    options;

  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any)['Gerenciament']) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load Gerenciament SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setProvider((window as any)['Gerenciament']);
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
