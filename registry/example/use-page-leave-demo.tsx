'use client';

import React, { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { usePageLeave } from '@/registry/hooks/use-page-leave';

export default function UsePageLeaveDemo() {
  const { isPageLeft, onPageLeave } = usePageLeave({
    showConfirmation: true,
    confirmationMessage:
      'Are you sure you want to leave? Unsaved changes may be lost.',
  });

  useEffect(() => {
    onPageLeave(() => {
      // Custom action when the user leaves the page (tab switch)
      // Example: save draft, send telemetry, etc.
      // Replace this with whatever logic you need
      // eslint-disable-next-line no-console
      console.log('User left the page (tab switch)');
    });
  }, [onPageLeave]);

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>usePageLeave</CardTitle>
        <CardDescription>
          This component demonstrates the <code>usePageLeave</code> hook to
          detect when the user switches tabs or tries to leave the page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge
          variant="secondary"
          className={cn(
            'w-fit',
            isPageLeft
              ? 'bg-yellow-500/30 border-yellow-500 text-yellow-700'
              : 'bg-green-500/30 border-green-500 text-green-700',
          )}
        >
          {isPageLeft
            ? 'You left the page (tab in background)'
            : 'You are viewing this page'}
        </Badge>
        <p className="text-sm text-muted-foreground">
          Open another tab or minimize the browser to see the status change.
          <br />
          Also try closing or reloading the page to see the confirmation alert.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </CardFooter>
    </Card>
  );
}
