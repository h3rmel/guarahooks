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
import { Label } from '@/components/ui/label';

import { usePageTitle } from '@/registry/hooks/use-page-title';

export default function UsePageTitleDemo() {
  const [title, setTitle] = useState('guarahooks');
  const { setTitle: updatePageTitle, resetTitle } = usePageTitle({
    suffix: 'guarahooks',
    separator: ' - ',
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdateTitle = () => {
    updatePageTitle(title);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Page Title Demo</CardTitle>
        <CardDescription>Change the page title dynamically</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">New Page Title</Label>
          <Input
            id="title"
            placeholder="Enter new page title"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Current document title:{' '}
          <span className="font-mono">
            {typeof document !== 'undefined'
              ? document.title
              : 'Not available on server'}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetTitle}>
          Reset Title
        </Button>
        <Button onClick={handleUpdateTitle}>Update Title</Button>
      </CardFooter>
    </Card>
  );
}
