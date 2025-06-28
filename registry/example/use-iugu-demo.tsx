'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useIugu } from '@/registry/hooks/use-iugu';

export default function UseIuguDemo() {
  const { iugu, loading, error, createPaymentToken } = useIugu();

  const handleToken = () => {
    const form = document.createElement('form');
    createPaymentToken(form, console.log);
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Iugu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleToken} disabled={!iugu || loading}>
          {loading ? 'Loading...' : 'Create Token'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
