'use client';

import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useOnMount } from '@/registry/hooks/use-on-mount';

export function ExampleComponent() {
  const [message, setMessage] = useState('Waiting for mount...');

  useOnMount(() => {
    setMessage('The component has been mounted!');
    console.log('Component mounted!');
  });

  return (
    <Card className="max-w-sm w-full relative">
      <CardHeader>
        <CardTitle>useOnMount</CardTitle>
        <CardDescription>
          This example uses the <code>useOnMount</code> hook to execute a
          function only once when the component is mounted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Check console for more information.
        </p>
      </CardFooter>
    </Card>
  );
}
