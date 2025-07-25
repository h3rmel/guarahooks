'use client';

import React, { useState } from 'react';

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
import { Input } from '@/components/ui/input';

import { useArrayState } from '@/registry/hooks/use-array-state';

export default function UseArrayStateDemo() {
  const [inputValue, setInputValue] = useState('');
  const [updateIndex, setUpdateIndex] = useState('');
  const [updateValue, setUpdateValue] = useState('');

  const {
    array,
    length,
    isEmpty,
    first,
    last,
    push,
    pop,
    shift,
    unshift,
    insert,
    remove,
    update,
    clear,
    reset,
    sort,
    reverse,
    filter,
  } = useArrayState<string>({
    initialValue: ['React', 'TypeScript', 'Next.js'],
    onChange: (newArray) => {
      console.log('Array changed:', newArray);
    },
  });

  const handleAddItem = () => {
    if (inputValue.trim()) {
      push(inputValue.trim());
      setInputValue('');
    }
  };

  const handleUpdateItem = () => {
    const index = parseInt(updateIndex);
    if (!isNaN(index) && updateValue.trim()) {
      update(index, updateValue.trim());
      setUpdateIndex('');
      setUpdateValue('');
    }
  };

  const handleInsertAtStart = () => {
    if (inputValue.trim()) {
      unshift(inputValue.trim());
      setInputValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const handleFilterLongItems = () => {
    filter((item) => item.length <= 6);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>useArrayState</CardTitle>
        <CardDescription>
          A powerful hook for managing arrays as React state with built-in
          manipulation methods.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Array Display */}
        <div>
          <h3 className="text-sm font-medium mb-2">Current Array:</h3>
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-muted/20">
            {array.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleRemoveItem(index)}
              >
                {item} ×
              </Badge>
            ))}
            {isEmpty && (
              <span className="text-muted-foreground text-sm">
                Array is empty
              </span>
            )}
          </div>
        </div>

        {/* Array Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{length}</div>
            <div className="text-xs text-muted-foreground">Length</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium truncate">{first || 'N/A'}</div>
            <div className="text-xs text-muted-foreground">First</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium truncate">{last || 'N/A'}</div>
            <div className="text-xs text-muted-foreground">Last</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{isEmpty ? 'Yes' : 'No'}</div>
            <div className="text-xs text-muted-foreground">Empty</div>
          </div>
        </div>

        <div className="border-t" />

        {/* Add Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Add Items:</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter item to add"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem();
                }
              }}
            />
            <Button onClick={handleAddItem} disabled={!inputValue.trim()}>
              Add to End
            </Button>
            <Button
              onClick={handleInsertAtStart}
              disabled={!inputValue.trim()}
              variant="outline"
            >
              Add to Start
            </Button>
          </div>
        </div>

        {/* Update Item */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Update Item:</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Index"
              value={updateIndex}
              onChange={(e) => setUpdateIndex(e.target.value)}
              className="w-20"
            />
            <Input
              placeholder="New value"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUpdateItem();
                }
              }}
            />
            <Button
              onClick={handleUpdateItem}
              disabled={!updateIndex.trim() || !updateValue.trim()}
              variant="outline"
            >
              Update
            </Button>
          </div>
        </div>

        <div className="border-t" />

        {/* Array Operations */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Array Operations:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              onClick={() => pop()}
              disabled={isEmpty}
              variant="outline"
              size="sm"
            >
              Remove Last
            </Button>
            <Button
              onClick={() => shift()}
              disabled={isEmpty}
              variant="outline"
              size="sm"
            >
              Remove First
            </Button>
            <Button
              onClick={() => sort()}
              disabled={isEmpty}
              variant="outline"
              size="sm"
            >
              Sort A-Z
            </Button>
            <Button
              onClick={() => reverse()}
              disabled={isEmpty}
              variant="outline"
              size="sm"
            >
              Reverse
            </Button>
            <Button
              onClick={handleFilterLongItems}
              disabled={isEmpty}
              variant="outline"
              size="sm"
            >
              Filter Short
            </Button>
            <Button
              onClick={clear}
              disabled={isEmpty}
              variant="destructive"
              size="sm"
            >
              Clear All
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Click on items to remove them. Use the operations above to manipulate
        the array.
      </CardFooter>
    </Card>
  );
}
