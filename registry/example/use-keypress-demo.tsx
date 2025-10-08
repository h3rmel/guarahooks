'use client';

import React from 'react';

import confetti from 'canvas-confetti';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useKeypress } from '@/registry/hooks/use-keypress';

export default function UseKeypressDemo() {
  const popStars = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star'],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  useKeypress({
    combo: ['ctrl+m', 'meta+m'],
    callback: (e) => {
      popStars();
    },
    preventDefault: true,
  });

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useKeypress</CardTitle>
        <CardDescription>
          This component uses the <code>useKeypress</code> hook to detect key
          combinations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Press Ctrl+M (Windows/Linux) or Cmd+M (Mac) to see some magic.</p>
      </CardContent>
    </Card>
  );
}
