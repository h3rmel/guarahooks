'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useSquare } from '@/registry/hooks/use-square';

export default function UseSquareDemo() {
  const { square, loading, error, init } = useSquare({
    applicationId: 'sandbox',
    locationId: 'test',
  });

  const handleInit = () => {
    init();
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Square Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleInit} disabled={loading}>
          {loading ? 'Loading...' : square ? 'Initialized' : 'Init'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
