'use client';

import React, { useState } from 'react';

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

import { ConfirmationStatus, useConfirm } from '@/registry/hooks/use-confirm';

export default function UseConfirmDemo() {
  const [open, setOpen] = useState(false);
  const { status, confirm, cancel, reset } = useConfirm();

  const getStatusMessage = (status: ConfirmationStatus) => {
    switch (status) {
      case 'idle':
        return 'Waiting for action...';
      case 'confirming':
        return 'Are you sure?';
      case 'confirmed':
        return 'Action confirmed!';
      case 'cancelled':
        return 'Action cancelled!';
    }
  };

  const handleConfirm = () => {
    confirm();
    setOpen(false);
  };

  const handleCancel = () => {
    cancel();
    setOpen(false);
  };

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useConfirm</CardTitle>
        <CardDescription>
          This component uses the <code>useConfirm</code> hook to handle user
          confirmation actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Status: <strong>{getStatusMessage(status)}</strong>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Delete Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {(status === 'confirmed' || status === 'cancelled') && (
          <Button onClick={reset}>Reset</Button>
        )}
      </CardFooter>
    </Card>
  );
}
