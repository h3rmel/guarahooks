'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useCielo } from '@/registry/hooks/use-cielo';

export default function UseCieloDemo() {
  const { provider, loading, error, init } = useCielo();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Cielo</CardTitle>
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
