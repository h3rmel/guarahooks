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

import { useTimeout } from '@/registry/hooks/use-timeout';

export default function UseTimeoutDemo() {
  const [message, setMessage] = useState('Click "Start" to begin the timeout.');
  const [active, setActive] = useState(false);

  // Execute callback after 3 seconds when active is true
  useTimeout(
    () => {
      setMessage('Timeout expired!');
      setActive(false);
    },
    active ? 3000 : null,
  );

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useTimeout</CardTitle>
        <CardDescription>
          This component demonstrates the <code>useTimeout</code> hook. Click
          start to trigger a timeout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold">{message}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button
          onClick={() => {
            setMessage('Waiting for timeout...');
            setActive(true);
          }}
        >
          Start
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setMessage('Click "Start" to begin the timeout.');
            setActive(false);
          }}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
