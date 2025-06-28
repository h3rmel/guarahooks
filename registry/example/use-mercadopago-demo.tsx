'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useMercadoPago } from '@/registry/hooks/use-mercadopago';

export default function UseMercadoPagoDemo() {
  const { mp, loading, error, createCheckout } = useMercadoPago({
    publicKey: 'TEST-123',
  });

  const handleCheckout = () => {
    createCheckout('demo-preference');
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>MercadoPago Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!mp || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
