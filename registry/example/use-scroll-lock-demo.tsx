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

import { useScrollLock } from '@/registry/hooks/use-scroll-lock';

export default function UseScrollLockDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    isLocked: isContainerLocked,
    lock: lockContainer,
    unlock: unlockContainer,
    toggle: toggleContainer,
  } = useScrollLock<HTMLDivElement>(containerRef);

  const {
    isLocked: isPageLocked,
    lock: lockPage,
    unlock: unlockPage,
    toggle: togglePage,
  } = useScrollLock();

  return (
    <Card className="relative max-w-md w-full space-y-4">
      <CardHeader>
        <CardTitle>useScrollLock</CardTitle>
        <CardDescription>
          This component demonstrates locking and unlocking scroll on an element
          or the page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p>
            Container scroll locked:{' '}
            <strong>{isContainerLocked ? 'Yes' : 'No'}</strong>
          </p>
          <div
            ref={containerRef}
            className="h-40 overflow-y-auto border p-2 space-y-2"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>Content line {i + 1}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={lockContainer}>Lock Container</Button>
            <Button variant="outline" onClick={unlockContainer}>
              Unlock Container
            </Button>
            <Button variant="secondary" onClick={toggleContainer}>
              Toggle Container
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p>
            Page scroll locked: <strong>{isPageLocked ? 'Yes' : 'No'}</strong>
          </p>
          <div className="flex gap-2">
            <Button onClick={lockPage}>Lock Page</Button>
            <Button variant="outline" onClick={unlockPage}>
              Unlock Page
            </Button>
            <Button variant="secondary" onClick={togglePage}>
              Toggle Page
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Try scrolling this container or the page and use the buttons above.
        </p>
      </CardFooter>
    </Card>
  );
}
