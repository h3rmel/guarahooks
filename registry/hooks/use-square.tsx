'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseSquareOptions {
  applicationId: string;
  locationId: string;
  scriptUrl?: string;
  autoInit?: boolean;
}

export interface UseSquareReturn {
  square: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

export function useSquare(options: UseSquareOptions): UseSquareReturn {
  const {
    applicationId,
    locationId,
    scriptUrl = 'https://web.squarecdn.com/v1/square.js',
    autoInit = true,
  } = options;

  const [square, setSquare] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!(window as any).Square) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Square SDK'));
      });
    }
  }, [scriptUrl]);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadScript();
      const payments = (window as any).Square.payments(
        applicationId,
        locationId,
      );
      setSquare(payments);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [applicationId, locationId, loadScript]);

  useEffect(() => {
    if (autoInit) {
      init();
    }
  }, [autoInit, init]);

  return { square, loading, error, init };
}
