'use client';

import React, { useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useEventListener } from '@/registry/hooks/use-event-listener';

export default function UseEventListenerDemo() {
  // State for window events
  const [windowMousePosition, setWindowMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [windowScroll, setWindowScroll] = useState(0);

  // State for element-specific events
  const [clickCount, setClickCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Reference for the element we want to track
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track mouse position across the window
  useEventListener({
    eventName: 'mousemove',
    handler: (event) => {
      setWindowMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

  // Track window scroll position
  useEventListener({
    eventName: 'scroll',
    handler: () => {
      setWindowScroll(window.scrollY);
    },
  });

  // Track clicks on a specific element
  useEventListener<'click', HTMLButtonElement>({
    eventName: 'click',
    handler: () => setClickCount((prev) => prev + 1),
    element: buttonRef,
  });

  // Track mouse enter/leave on element
  useEventListener<'mouseenter', HTMLButtonElement>({
    eventName: 'mouseenter',
    handler: () => setIsHovering(true),
    element: buttonRef,
  });

  useEventListener<'mouseleave', HTMLButtonElement>({
    eventName: 'mouseleave',
    handler: () => setIsHovering(false),
    element: buttonRef,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle>Window Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">Mouse Position: </p>
            <Badge variant="secondary">
              X: {windowMousePosition.x}, Y: {windowMousePosition.y}
            </Badge>
            <p className="font-medium">Scroll Position: </p>
            <Badge variant="secondary">{windowScroll}px</Badge>
          </CardContent>
        </Card>

        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle>Element Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Click Count: </span>
              <Badge variant="secondary">{clickCount}</Badge>
            </div>
            <div>
              <span className="font-medium">Hover State: </span>
              <Badge variant={isHovering ? 'default' : 'secondary'}>
                {isHovering ? 'Hovering' : 'Not Hovering'}
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              ref={buttonRef}
              className={`mt-2 ${isHovering ? 'bg-primary-foreground' : ''}`}
            >
              Click Me
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        Try moving your mouse, scrolling, or interacting with the button above.
      </div>
    </div>
  );
}
