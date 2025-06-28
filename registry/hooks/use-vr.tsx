'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseVRPayOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseVRPayReturn {
  vrpay: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useVRPay(options: UseVRPayOptions = {}): UseVRPayReturn {
  const { scriptUrl = 'https://cdn.vr.com.br/vrpay.js', autoInit = true } =
    options;

  const [vrpay, setVrPay] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).VRPay) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load VR Pay SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setVrPay((window as any).VRPay);
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

  return { vrpay, loading, error, init };
}
