'use client';

import { useCallback, useEffect, useState } from 'react';

export interface UseApplePayOptions {
  countryCode: string;
  currencyCode: string;
  merchantIdentifier: string;
  supportedNetworks: string[];
  merchantCapabilities?: string[];
}

export interface UseApplePayReturn {
  canMakePayments: boolean;
  session: ApplePaySession | null;
  startSession: (request: ApplePayPaymentRequest) => void;
}

export function useApplePay(options: UseApplePayOptions): UseApplePayReturn {
  const [canMakePayments, setCanMakePayments] = useState(false);
  const [session, setSession] = useState<ApplePaySession | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ApplePaySession) {
      setCanMakePayments((window as any).ApplePaySession.canMakePayments());
    }
  }, []);

  const startSession = useCallback((request: ApplePayPaymentRequest) => {
    if (typeof window === 'undefined' || !(window as any).ApplePaySession) {
      throw new Error('Apple Pay is not available');
    }
    const appleSession = new (window as any).ApplePaySession(3, request);
    setSession(appleSession);
    appleSession.begin();
  }, []);

  return { canMakePayments, session, startSession };
}
