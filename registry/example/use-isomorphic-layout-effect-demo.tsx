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

import { useIsomorphicLayoutEffect } from '@/registry/hooks/use-isomorphic-layout-effect';

export default function UseIsomorphicLayoutEffectDemo() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (boxRef.current) {
      setBoxWidth(Math.round(boxRef.current.getBoundingClientRect().width));
    }
  }, []);

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useIsomorphicLayoutEffect</CardTitle>
        <CardDescription>
          This component measures its own width using an isomorphic layout
          effect (no SSR warning).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={boxRef} className="border border-border rounded-md p-4">
          <p>Resize or hydrate to measure this box.</p>
        </div>
        <p className="mt-2">Box width: {boxWidth}px</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setBoxWidth(0)}>Reset</Button>
      </CardFooter>
    </Card>
  );
}
