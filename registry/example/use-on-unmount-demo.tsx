'use client';

import React, { useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useOnUnmount } from '@/registry/hooks/use-on-unmount';

function ChildComponent() {
  useOnUnmount(() => {
    toast.success('Component unmounted successfully!');
  });

  return (
    <div className="p-4 rounded-md bg-muted">
      <p>I am the child component. Click to unmount me!</p>
    </div>
  );
}

export default function UseOnUnmountDemo() {
  const [showChild, setShowChild] = useState(true);

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useOnUnmount</CardTitle>
        <CardDescription>
          This example uses the <code>useOnMount</code> hook to execute a
          function only once when the component is mounted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setShowChild((prev) => !prev)}>
          {showChild ? 'Unmount child component' : 'Mount child component'}
        </Button>
        <div className="mt-6 min-h-[60px]">
          {showChild && <ChildComponent />}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          When the child component is unmounted, a toast will be displayed using
          shadcn/ui.
        </p>
      </CardFooter>
    </Card>
  );
}
