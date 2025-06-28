'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useMova } from '@/registry/hooks/use-mova';

export default function UseMovaDemo() {
  const { provider, loading, error, init } = useMova();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Mova</CardTitle>
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
