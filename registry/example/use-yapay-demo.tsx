'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useYapay } from '@/registry/hooks/use-yapay';

export default function UseYapayDemo() {
  const { provider, loading, error, init } = useYapay();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Yapay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={init} disabled={loading}>
          {loading ? 'Loading...' : 'Init'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
        {provider && <p className="text-sm">SDK loaded</p>}
      </CardContent>
    </Card>
  );
}
