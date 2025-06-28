'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useStripe } from '@/registry/hooks/use-stripe';

export default function UseStripeDemo() {
  const { stripe, loading, error, redirectToCheckout } = useStripe({
    publishableKey: 'pk_test_12345',
  });
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    try {
      await redirectToCheckout({ sessionId: 'demo-session' });
      setMessage('Redirecting...');
    } catch (err) {
      console.error(err);
      setMessage('Failed to start checkout');
    }
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Stripe Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!stripe || loading}>
          {loading ? 'Loading...' : 'Start Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
        {message && <p className="text-sm">{message}</p>}
      </CardContent>
    </Card>
  );
}
