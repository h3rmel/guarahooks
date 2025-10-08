'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useScrollPosition } from '@/registry/hooks/use-scroll-position';

export default function UseScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useScrollPosition</CardTitle>
        <CardDescription>
          This component uses the <code>useScrollPosition</code> hook to track
          the page scroll position.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Scroll X: {x}px</p>
        <p>Scroll Y: {y}px</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Scroll the page to see the values change.
        </p>
      </CardFooter>
    </Card>
  );
}
