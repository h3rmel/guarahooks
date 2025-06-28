'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useApplePay } from '@/registry/hooks/use-apple-pay';

export default function UseApplePayDemo() {
  const { canMakePayments, startSession } = useApplePay({
    countryCode: 'US',
    currencyCode: 'USD',
    merchantIdentifier: 'merchant.com.example',
    supportedNetworks: ['visa', 'masterCard'],
  });

  const handlePay = () => {
    const request = {
      countryCode: 'US',
      currencyCode: 'USD',
      total: { label: 'Demo', amount: '1.00' },
      supportedNetworks: ['visa', 'masterCard'],
      merchantCapabilities: ['supports3DS'],
    } as ApplePayPaymentRequest;
    startSession(request);
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Apple Pay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handlePay} disabled={!canMakePayments}>
          Pay with Apple Pay
        </Button>
      </CardContent>
    </Card>
  );
}
