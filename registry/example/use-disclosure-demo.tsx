'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useDisclosure } from '@/registry/hooks/use-disclosure';

export default function UseDisclosureDemo() {
  const [isOpen, { close, toggle }] = useDisclosure(false, {
    onOpen: () => console.log('Dialog opened'),
    onClose: () => console.log('Dialog closed'),
  });

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useDisclosure</CardTitle>
        <CardDescription>
          This component uses the <code>useDisclosure</code> hook to manage the
          state of a dialog component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Dialog is: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Example Dialog</DialogTitle>
              <DialogDescription>
                This is an example dialog controlled by the useDisclosure hook.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                Close
              </Button>
              <Button onClick={close}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={toggle}>
          Toggle Dialog
        </Button>
      </CardFooter>
    </Card>
  );
}
