'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTwoCheckout } from '@/registry/hooks/use-two-checkout';

export default function UseTwoCheckoutDemo() {
  const { twoCo, loading, error, openCheckout } = useTwoCheckout();

  const handleCheckout = () => {
    openCheckout({});
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>2Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!twoCo || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
