'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useCopyToClipboard } from '@/registry/hooks/use-copy-to-clipboard';

export function UseCopyToClipboardDemo() {
  const [text, setText] = useState('');
  const { copied, copy } = useCopyToClipboard();

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useCopyToClipboard</CardTitle>
        <CardDescription>
          This component uses the <code>useCopyToClipboard</code> hook to copy
          text to the clipboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something to copy..."
        />
        <div className="flex items-center gap-2">
          <Button onClick={() => copy(text)} disabled={!text}>
            Copiar
          </Button>
          {copied && (
            <span className="text-green-500 bg-green-500/20 px-2 py-0.5 rounded-md">
              Copied!
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
