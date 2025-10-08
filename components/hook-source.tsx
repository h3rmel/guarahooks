'use client';

import * as React from 'react';

import { CodeBlockWrapper } from '@/components/code-block-wrapper';

import { cn } from '@/lib/utils';

interface HookSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function HookSource({ children, className, ...props }: HookSourceProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn('my-6 overflow-hidden rounded-md', className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  );
}
