'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAliPay } from '@/registry/hooks/use-ali-pay';

export default function UseAliPayDemo() {
  const { alipay, loading, error, openCheckout } = useAliPay();

  const handleCheckout = () => {
    openCheckout({});
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>AliPay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!alipay || loading}>
          {loading ? 'Loading...' : 'Open Checkout'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
