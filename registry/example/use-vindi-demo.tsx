'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useVindi } from '@/registry/hooks/use-vindi';

export default function UseVindiDemo() {
  const { vindi, loading, error, openCheckout } = useVindi();

  const handleCheckout = () => {
    openCheckout({});
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Vindi Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!vindi || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
