'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseBraintreeOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseBraintreeReturn {
  braintree: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useBraintree(
  options: UseBraintreeOptions = {},
): UseBraintreeReturn {
  const {
    scriptUrl = 'https://js.braintreegateway.com/web/dropin/1.35.0/js/dropin.min.js',
    autoInit = true,
  } = options;

  const [braintree, setBraintree] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).braintree) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error('Failed to load Braintree SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setBraintree((window as any).braintree);
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

  return { braintree, loading, error, init };
}
