'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useEfiBank } from '@/registry/hooks/use-efi-bank';

export default function UseEfiBankDemo() {
  const { provider, loading, error, init } = useEfiBank();

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Efi Bank</CardTitle>
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
