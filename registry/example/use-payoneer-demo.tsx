'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usePayoneer } from '@/registry/hooks/use-payoneer';

export default function UsePayoneerDemo() {
  const { payoneer, loading, error, openCheckout } = usePayoneer();

  const handleCheckout = () => {
    openCheckout({});
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Payoneer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!payoneer || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
