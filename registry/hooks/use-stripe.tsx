'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseStripeOptions {
  publishableKey: string;
  stripeOptions?: Record<string, unknown>;
  autoInit?: boolean;
}

export interface UseStripeReturn {
  stripe: any;
  loading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  redirectToCheckout: (options: any) => Promise<void>;
  confirmCardPayment: (clientSecret: string, data?: any) => Promise<any>;
}

export function useStripe(options: UseStripeOptions): UseStripeReturn {
  const { publishableKey, stripeOptions = {}, autoInit = true } = options;
  const [stripe, setStripe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { loadStripe } = await import('@stripe/stripe-js');
      const instance = await loadStripe(publishableKey, stripeOptions);
      setStripe(instance);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [publishableKey, stripeOptions]);

  useEffect(() => {
    if (autoInit) {
      init();
    }
  }, [autoInit, init]);

  const redirectToCheckout = useCallback(
    async (opts: any) => {
      if (!stripe) throw new Error('Stripe not initialized');
      await stripe.redirectToCheckout(opts);
    },
    [stripe],
  );

  const confirmCardPayment = useCallback(
    async (clientSecret: string, data?: any) => {
      if (!stripe) throw new Error('Stripe not initialized');
      return stripe.confirmCardPayment(clientSecret, data);
    },
    [stripe],
  );

  return {
    stripe,
    loading,
    error,
    init,
    redirectToCheckout,
    confirmCardPayment,
  };
}
