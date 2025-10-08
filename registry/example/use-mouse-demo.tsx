'use client';

import { RefObject, useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { useMouse } from '@/registry/hooks/use-mouse';

export default function UseMouseDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [trackOutside, setTrackOutside] = useState(false);
  const [clampToZero, setClampToZero] = useState(false);
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse({
    ref: ref as RefObject<HTMLElement>,
    trackOutside,
    clampToZero,
  });

  return (
    <Card className="relative max-w-md w-full" ref={ref}>
      <CardHeader>
        <CardTitle>useMouse</CardTitle>
        <CardDescription>
          This component uses the <code>useMouse</code> hook to track the mouse
          position.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={trackOutside}
            onCheckedChange={() => setTrackOutside((v) => !v)}
          />
          <label htmlFor="trackOutside">Track outside</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={clampToZero}
            onCheckedChange={() => setClampToZero((v) => !v)}
          />
          <label htmlFor="clampToZero">Clamp to zero</label>
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            Mouse position in document - x:{docX} y:{docY}
          </p>
          <p className="text-sm">
            Mouse position in element - x:{elX} y:{elY}
          </p>
          <p className="text-sm">
            Element position- x:{posX} y:{posY}
          </p>
          <p className="text-sm">
            Element dimensions - {elW}x{elH}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Try moving your mouse around the screen.
        </p>
      </CardFooter>
    </Card>
  );
}
