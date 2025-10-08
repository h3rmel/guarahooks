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

import { useMap } from '@/registry/hooks/use-map';

export default function UseMapDemo() {
  const {
    getAll,
    set: setEntry,
    delete: deleteEntry,
    has,
    clear,
    reset,
    get,
  } = useMap<string, string>([['key1', 'value1']]);

  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  return (
    <Card className="relative max-w-md w-full">
      <CardHeader>
        <CardTitle>useMap</CardTitle>
        <CardDescription>
          This component uses the <code>useMap</code> hook to manage a map of
          key/value pairs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Key"
          />
          <Input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Value"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setEntry(keyInput, valueInput)}>Set</Button>
          <Button onClick={() => deleteEntry(keyInput)} variant="destructive">
            Delete
          </Button>
          <Button onClick={clear} variant="secondary">
            Clear
          </Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
        <p>Entries in the Map:</p>
        <ul className="list-disc list-inside mt-2">
          {getAll().map(([k, v]) => (
            <li key={k}>
              {k}: {v}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Map (doesn't modify the state): {JSON.stringify(getAll())}
        </p>
      </CardFooter>
    </Card>
  );
}
