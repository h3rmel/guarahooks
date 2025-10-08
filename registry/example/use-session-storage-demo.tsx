'use client';

import React, { useState } from 'react';

import { Label } from '@radix-ui/react-label';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import useSessionStorage from '@/registry/hooks/use-session-storage';

// Custom serializer/deserializer for an object
const userSerializer = (user: { name: string; age: number }) =>
  JSON.stringify(user);
const userDeserializer = (str: string) => {
  try {
    return JSON.parse(str) as { name: string; age: number };
  } catch {
    return { name: '', age: 0 };
  }
};

export default function UseSessionStorageDemo() {
  // Object example with custom serializer/deserializer
  const [user, setUser] = useSessionStorage<{ name: string; age: number }>(
    'demo-user',
    { name: '', age: 0 },
    { serialize: userSerializer, deserialize: userDeserializer },
  );

  const [ageInput, setAgeInput] = useState('');

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useSessionStorage</CardTitle>
        <CardDescription>
          This component uses the <code>useSessionStorage</code> hook to manage
          a session storage item.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>User (object):</Label>
          <Input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="User name..."
          />
          <Input
            type="number"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
            placeholder="User age..."
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              const age = parseInt(ageInput, 10);
              if (!isNaN(age)) setUser({ ...user, age });
            }}
            size="sm"
          >
            Set Age
          </Button>
          <Button onClick={() => setUser({ name: '', age: 0 })} size="sm">
            Clear User
          </Button>
        </div>
        <pre className="text-sm text-muted-foreground bg-accent w-fit px-1 py-0.5 rounded-xs">
          {JSON.stringify(user)}
        </pre>
      </CardContent>
    </Card>
  );
}
