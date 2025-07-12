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

import { usePrevious } from '@/registry/hooks/use-previous';

export default function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>Previous Count</CardTitle>
        <CardDescription>
          This is a demo of the usePrevious hook.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Count: {count}</p>
        <p>Previous Count: {previousCount}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </CardFooter>
    </Card>
  );
}
