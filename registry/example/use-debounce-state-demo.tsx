'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useDebouncedState } from '@/registry/hooks/use-debounce-state';

export default function UseDebounceStateDemo() {
  const [immediateValue, setImmediateValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useDebouncedState('', 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImmediateValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  return (
    <Card className="max-w-md w-full relative">
      <CardHeader>
        <CardTitle>useDebounceState</CardTitle>
        <CardDescription>
          This component uses the <code>useDebounceState</code> hook to debounce
          the state update.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          value={immediateValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            Immediate value:
          </span>
          <span className="font-mono bg-muted rounded px-2 py-1">
            {immediateValue}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            Debounced value:
          </span>
          <span className="font-mono bg-muted rounded px-2 py-1">
            {debouncedValue}
          </span>
        </div>
        <span className="text-sm text-muted-foreground mt-2">
          The debounced value updates 1s after you stop typing.
        </span>
      </CardFooter>
    </Card>
  );
}
