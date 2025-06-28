'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usePagBank } from '@/registry/hooks/use-pagbank';

export default function UsePagBankDemo() {
  const { pagbank, loading, error, openWidget } = usePagBank();

  const handleCheckout = () => {
    openWidget('demo-token');
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>PagBank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!pagbank || loading}>
          {loading ? 'Loading...' : 'Open Widget'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
