'use client';

import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useMutationObserver } from '@/registry/hooks/use-mutation-observer';

export function UseMutationObserverDemo() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [mutations, setMutations] = useState<MutationRecord[]>([]);
  const [count, setCount] = useState(0);

  useMutationObserver<HTMLDivElement>({
    target: targetRef,
    callback: (mutationsList) => {
      setMutations((prev) => [...prev, ...mutationsList]);
      setCount((prev) => prev + mutationsList.length);
    },
  });

  const addElement = () => {
    if (targetRef.current) {
      const newElement = document.createElement('div');
      newElement.className = 'p-2 m-2 border rounded';
      newElement.textContent = `New Element ${count + 1}`;
      targetRef.current.appendChild(newElement);
    }
  };

  const clearMutations = () => {
    setMutations([]);
    setCount(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mutation Observer Demo</CardTitle>
        <CardDescription>
          Watch how the hook detects DOM changes in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={addElement}>Add Element</Button>
          <Button variant="outline" onClick={clearMutations}>
            Clear Mutations
          </Button>
        </div>

        <div ref={targetRef} className="min-h-[100px] p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Target Element</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Mutation Count: {count}</h3>
          <div className="max-h-[200px] overflow-auto">
            {mutations.map((mutation, index) => (
              <div key={index} className="p-2 text-sm rounded">
                <p>Type: {mutation.type}</p>
                <p>Target: {mutation.target.nodeName}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
