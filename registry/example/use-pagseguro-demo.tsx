'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usePagSeguro } from '@/registry/hooks/use-pagseguro';

export default function UsePagSeguroDemo() {
  const { pagseguro, loading, error, openLightbox } = usePagSeguro();

  const handleCheckout = () => {
    openLightbox('demo-code');
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>PagSeguro</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleCheckout} disabled={!pagseguro || loading}>
          {loading ? 'Loading...' : 'Open Lightbox'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
