'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useInterval } from '@/registry/hooks/use-interval';

export default function UseIntervalDemo() {
  const [count, setCount] = useState(0);

  // Increment the count every second
  useInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useInterval</CardTitle>
        <CardDescription>
          This component uses the <code>useInterval</code> hook to increment a
          counter every second.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold">Count: {count}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setCount(0)}>Reset</Button>
      </CardFooter>
    </Card>
  );
}
