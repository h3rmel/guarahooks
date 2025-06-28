'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usePagarme } from '@/registry/hooks/use-pagarme';

export default function UsePagarmeDemo() {
  const { pagarme, loading, error, createCardHash } = usePagarme();

  const handleToken = async () => {
    try {
      const hash = await createCardHash({
        key: 'pk_test',
        number: '4111111111111111',
        holder_name: 'Test',
        exp_month: '12',
        exp_year: '30',
        cvv: '123',
      });
      console.log(hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Pagar.me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleToken} disabled={!pagarme || loading}>
          {loading ? 'Loading...' : 'Create Card Hash'}
        </Button>
        {error && <p className="text-destructive text-sm">{error.message}</p>}
      </CardContent>
    </Card>
  );
}
