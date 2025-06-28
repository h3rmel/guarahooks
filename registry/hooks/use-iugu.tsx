'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseIuguOptions {
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseIuguReturn {
  iugu: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  createPaymentToken: (
    form: HTMLFormElement,
    callback: (response: any) => void,
  ) => void;
}

export function useIugu(options: UseIuguOptions = {}): UseIuguReturn {
  const { scriptUrl = 'https://js.iugu.com/v2', autoInit = true } = options;

  const [iugu, setIugu] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Iugu) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Iugu SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      setIugu((window as any).Iugu);
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

  const createPaymentToken = useCallback(
    (form: HTMLFormElement, callback: (response: any) => void) => {
      if (!iugu) throw new Error('Iugu not initialized');
      iugu.createPaymentToken(form, callback);
    },
    [iugu],
  );

  return { iugu, loading, error, init, createPaymentToken };
}
