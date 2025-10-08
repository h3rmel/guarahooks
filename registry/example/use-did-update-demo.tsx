'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useDidUpdate } from '@/registry/hooks/use-did-update';

export default function UseDidUpdateDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useDidUpdate(() => {
    setMessage(`The count was updated to ${count}`);
  }, [count]);

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useDidUpdate</CardTitle>
        <CardDescription>
          This example uses the <code>useDidUpdate</code> hook to execute a
          function when the count state is updated.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-bold">{count}</p>
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
          <p className="text-sm text-muted-foreground mt-2">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
