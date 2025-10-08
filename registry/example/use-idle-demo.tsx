'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useIdle } from '@/registry/hooks/use-idle';

export default function UseIdleDemo() {
  // 2 seconds of timeout
  const [idle, resetIdle] = useIdle(2000);

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useIdle</CardTitle>
        <CardDescription>
          This component uses the <code>useIdle</code> hook to detect if the
          user is idle for a given timeout (2 seconds).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge
          variant="secondary"
          className={cn(
            'w-fit',
            idle
              ? 'bg-red-500/30 border-red-500'
              : 'bg-green-500/30 border-green-500',
          )}
        >
          The user is{' '}
          <p
            className={cn(
              'text-foreground font-bold uppercase',
              idle ? 'text-red-500' : 'text-green-500',
            )}
          >
            {idle ? 'idle' : 'active'}
          </p>
        </Badge>
        <p className="text-sm text-muted-foreground">
          Interact with the page (keyboard, mouse, scroll, etc) to reset the
          idle timer.
        </p>
        <Button size="sm" onClick={resetIdle}>
          Or click here
        </Button>
      </CardContent>
    </Card>
  );
}
