'use client';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

export function OpenInV0({ url }: { url: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          className={cn(
            buttonVariants({
              size: 'icon',
            }),
          )}
          href={`https://v0.dev/chat/api/open?url=${url}`}
          target="_blank"
          aria-label="Open in v0"
          rel="noopener noreferrer"
        >
          <Icons.V0 className="size-4" />
        </a>
      </TooltipTrigger>
      <TooltipContent className="text-muted-foreground">
        Open in v0
      </TooltipContent>
    </Tooltip>
  );
}
