'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useLemonSqueezy } from '@/registry/hooks/use-lemon-squeezy';

export default function UseLemonSqueezyDemo() {
  const { lemon, loading, error, openCheckout } = useLemonSqueezy();

  const handleCheckout = () => {
    openCheckout('https://example.com/checkout');
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>LemonSqueezy Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!lemon || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
