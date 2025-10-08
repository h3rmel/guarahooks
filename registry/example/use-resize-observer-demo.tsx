'use client';

import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useResizeObserver } from '@/registry/hooks/use-resize-observer';

export function UseResizeObserverDemo() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [observing, setObserving] = useState(true);

  const { disconnect } = useResizeObserver<HTMLDivElement>({
    target: targetRef,
    callback: (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    },
  });

  const toggleObserving = () => {
    if (observing) {
      disconnect();
    }
    setObserving((prev) => !prev);
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Resize Observer Demo</CardTitle>
        <CardDescription>
          Observe size changes of the container in real time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={targetRef}
          className="resize border rounded-lg p-4 max-w-full overflow-auto"
          style={{ resize: 'both' }}
        >
          <p>Drag to resize this box</p>
        </div>
        <div>
          <p>Width: {size.width}px</p>
          <p>Height: {size.height}px</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={toggleObserving}>
          {observing ? 'Disconnect' : 'Observe'}
        </Button>
      </CardFooter>
    </Card>
  );
}
