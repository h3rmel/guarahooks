'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useToggle } from '@/registry/hooks/use-toggle';

export default function UseToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useToggle</CardTitle>
        <CardDescription>
          This component uses the <code>useToggle</code> hook to toggle a
          boolean state.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The state is: <strong>{isOn ? 'On' : 'Off'}</strong>
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={toggle}>Toggle</Button>
      </CardFooter>
    </Card>
  );
}
