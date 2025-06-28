'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAbacatePay } from '@/registry/hooks/use-abacate-pay';

export default function UseAbacatePayDemo() {
  const { abacate, loading, error, openCheckout } = useAbacatePay({
    publicKey: 'test_public_key',
  });

  const handleCheckout = () => {
    openCheckout('session-demo');
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>AbacatePay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!abacate || loading}>
          {loading ? 'Loading...' : 'Pay with AbacatePay'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
