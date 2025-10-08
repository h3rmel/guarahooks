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

import { useIntersectionObserver } from '@/registry/hooks/use-intersection-observer';

export function UseIntersectionObserverDemo() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { ref, entry, isIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Intersection Observer Demo</CardTitle>
        <CardDescription>
          Observe when the box enters/exits the viewport.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={(node) => {
            targetRef.current = node;
            ref(node);
          }}
          className="h-48 border-2 rounded-lg flex items-center justify-center"
        >
          {isIntersecting ? 'Visible' : 'Not Visible'}
        </div>
        <div>
          <p>Intersection Ratio: {entry?.intersectionRatio.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => ref(null)}>
          Reset Observer
        </Button>
      </CardFooter>
    </Card>
  );
}
