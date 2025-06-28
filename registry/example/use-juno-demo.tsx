'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useJuno } from '@/registry/hooks/use-juno';

export default function UseJunoDemo() {
  const { provider, loading, error, init } = useJuno();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Juno</CardTitle>
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
