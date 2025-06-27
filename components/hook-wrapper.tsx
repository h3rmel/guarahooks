'use client';

import React from 'react';

import { OpenInV0 } from '@/components/open-in-v0';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { Icons } from './icons';

interface HookWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const HookWrapper = ({
  className,
  children,
  name,
}: HookWrapperProps) => {
  const [key, setKey] = React.useState(0);

  return (
    <div
      className={cn('max-w-screen relative border bg-background', className)}
      key={key}
    >
      <div className="flex items-center justify-end gap-2 p-4">
        <OpenInV0 url={`https://guarahooks.com/r/${name}.json`} />
        <Button
          onClick={() => setKey((prev) => prev + 1)}
          size="icon"
          variant="ghost"
        >
          <Icons.Refresh aria-label="restart-btn" className="size-4" />
        </Button>
      </div>

      <div className="flex min-h-[350px] w-full items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
};
