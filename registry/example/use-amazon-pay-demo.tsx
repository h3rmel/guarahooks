'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAmazonPay } from '@/registry/hooks/use-amazon-pay';

export default function UseAmazonPayDemo() {
  const { amazon, loading, error, renderButton } = useAmazonPay({
    merchantId: 'test',
  });

  useEffect(() => {
    if (amazon) {
      renderButton('#amazon-pay-button');
    }
  }, [amazon, renderButton]);

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Amazon Pay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div id="amazon-pay-button" />
        {loading && <p className="text-sm">Loading...</p>}
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
