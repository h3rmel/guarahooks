'use client';

import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useFullscreen } from '@/registry/hooks/use-fullscreen';

export default function UseFullscreenDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, enter, exit] = useFullscreen(
    boxRef as React.RefObject<HTMLElement>,
  );

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useFullscreen</CardTitle>
        <CardDescription>
          This component uses the <code>useFullscreen</code> hook to toggle
          fullscreen mode for a specific element.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-primary">
          {isFullscreen ? 'In Fullscreen' : 'Not Fullscreen'}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={enter} disabled={isFullscreen} variant="secondary">
          Enter Fullscreen
        </Button>
        <Button onClick={exit} disabled={!isFullscreen} variant="destructive">
          Exit Fullscreen
        </Button>
      </CardFooter>
    </Card>
  );
}
