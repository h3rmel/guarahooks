'use client';

import React, { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useDebounceCallback } from '@/registry/hooks/use-debounce-callback';

export function UseDebounceCallbackDemo() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const updateDebouncedValue = useCallback((value: string) => {
    setDebouncedValue(value);
  }, []);

  const debouncedUpdate = useDebounceCallback(updateDebouncedValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedUpdate(value);
  };

  return (
    <Card className="max-w-md w-full relative">
      <CardHeader>
        <CardTitle>useDebounceCallback</CardTitle>
        <CardDescription>
          This component uses the <code>useDebounceCallback</code> hook to
          debounce the callback function to control the input value.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
          className="w-full"
        />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <p className="text-sm text-muted-foreground">
          <strong>Immediate value:</strong> {inputValue}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Debounced value:</strong> {debouncedValue}
        </p>
      </CardFooter>
    </Card>
  );
}
