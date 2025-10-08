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
import { Input } from '@/components/ui/input';

import { useSet } from '@/registry/hooks/use-set';

export default function UseSetDemo() {
  const {
    getAll,
    add,
    delete: remove,
    has,
    clear,
    reset,
  } = useSet<string>(['apple', 'banana']);

  const [input, setInput] = useState('');

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useSet</CardTitle>
        <CardDescription>
          This component uses the <code>useSet</code> hook to manage a set of
          values.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add fruit"
        />
        <div className="flex items-center gap-2">
          <Button onClick={() => add(input)}>Add</Button>
          <Button onClick={() => remove(input)} variant="destructive">
            Remove
          </Button>
          <Button onClick={clear} variant="secondary">
            Clear
          </Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
        <p>Fruits in the Set:</p>
        <ul className="list-disc list-inside mt-2">
          {[...getAll()].map((fruit: string) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Set (doesn't modify the state): {JSON.stringify(Array.from(getAll()))}
        </p>
      </CardFooter>
    </Card>
  );
}
