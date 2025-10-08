'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useOrientation } from '@/registry/hooks/use-orientation';

export default function UseOrientationDemo() {
  const orientation = useOrientation();

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useOrientation</CardTitle>
        <CardDescription>
          This component uses the <code>useOrientation</code> hook to get the
          current orientation of the device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Current orientation: {orientation}</p>
        {orientation === 'portrait' ? (
          <p className="text-green-600">You are in portrait mode 📱</p>
        ) : (
          <p className="text-purple-600">You are in landscape mode 🖥️</p>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Try rotating your device or resizing the window.
        </p>
      </CardFooter>
    </Card>
  );
}
