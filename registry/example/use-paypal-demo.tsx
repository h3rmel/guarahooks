'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usePayPal } from '@/registry/hooks/use-paypal';

export default function UsePayPalDemo() {
  const { paypal, loading, error, renderButtons } = usePayPal({
    clientId: 'test',
  });

  useEffect(() => {
    if (paypal) {
      renderButtons({}, '#paypal-button-container');
    }
  }, [paypal, renderButtons]);

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>PayPal Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div id="paypal-button-container" />
        {loading && <p className="text-sm">Loading...</p>}
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
