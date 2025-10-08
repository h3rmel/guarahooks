'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useLocalStorage } from '@/registry/hooks/use-local-storage';

export default function UseLocalStorageDemo() {
  // Example with a string
  const [name, setName] = useLocalStorage<string>('demo-name', '');

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useLocalStorage</CardTitle>
        <CardDescription>
          This component uses the <code>useLocalStorage</code> hook to manage a
          local storage item.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex items-end gap-2">
          <p>Name:</p>
          <pre className="text-sm text-muted-foreground bg-accent w-fit px-1 py-0.5 rounded-xs">
            {name}
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Looks in the local storage for the key <code>demo-name</code>.
        </p>
      </CardFooter>
    </Card>
  );
}
