'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useIsTouchDevice } from '@/registry/hooks/use-is-touch-device';

export default function UseIsTouchDeviceDemo() {
  const { isTouchable } = useIsTouchDevice();

  return (
    <Card className="w-full max-w-md relative">
      <CardHeader>
        <CardTitle>useIsTouchDevice</CardTitle>
        <CardDescription>
          This hook detects if the user's device has touch screen functionality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Touch Support Status:</p>
          <Badge
            variant={isTouchable ? 'default' : 'secondary'}
            className="w-fit"
          >
            {isTouchable ? 'Touch Device' : 'Non-Touch Device'}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {isTouchable
            ? 'Your device supports touch input'
            : 'Your device does not support touch input'}
        </div>
      </CardContent>
    </Card>
  );
}
