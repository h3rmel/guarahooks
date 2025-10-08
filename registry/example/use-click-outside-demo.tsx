'use client';

import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useClickOutside } from '@/registry/hooks/use-click-outside';

export default function UseClickOutsideDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [clickedOutside, setClickedOutside] = useState(false);

  useClickOutside(cardRef, () => {
    setClickedOutside(true);
  });

  return (
    <Card ref={cardRef} className="w-full max-w-sm relative">
      <CardHeader>
        <CardTitle>useClickOutside</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          Click outside of the card to trigger an action.
        </p>
        {clickedOutside ? (
          <div className="text-red-500 font-semibold mb-2">
            You clicked outside of the card!
          </div>
        ) : null}
        <Button onClick={() => setClickedOutside(false)} variant="outline">
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
