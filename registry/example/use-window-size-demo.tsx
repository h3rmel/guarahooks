'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useWindowSize } from '@/registry/hooks/use-window-size';

export default function UseWindowSizeDemo() {
  const { width, height } = useWindowSize({
    initialWidth: 1024,
    initialHeight: 768,
  });

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useWindowSize</CardTitle>
        <CardDescription>
          This component uses the <code>useWindowSize</code> hook to get the
          current window size.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Resize the window to see the values changing.
        </p>
      </CardFooter>
    </Card>
  );
}
