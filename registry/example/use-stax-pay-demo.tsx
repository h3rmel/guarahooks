'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useStaxPay } from '@/registry/hooks/use-stax-pay';

export default function UseStaxPayDemo() {
  const { stax, loading, error, openCheckout } = useStaxPay();

  const handleCheckout = () => {
    openCheckout({});
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Stax Pay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!stax || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
