'use client';

import React from 'react';

import { Icons, renderIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';

import { docsConfig } from '@/config/docs';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MobileLink } from './mobile-link';

export function MobileLinks() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.Menu className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-full',
          'bg-background/90 backdrop-blur',
          'no-scrollbar overflow-y-auto',
          'rounded-none border-0 border-t p-0 shadow-none',
          'h-(--radix-popper-available-height) w-(--radix-popper-available-width)',
        )}
        align="start"
        side="bottom"
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          {/* Main Navigation */}
          <ul className={cn('flex flex-col gap-y-4')}>
            <h4
              className={cn(
                'inline-flex items-center gap-2',
                'text-muted-foreground text-sm font-medium',
              )}
            >
              <span>Menu</span>
            </h4>
            <ul className={cn('flex flex-col gap-y-3')}>
              {docsConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <MobileLink
                    href={item.href!}
                    aria-label={item.title}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                </li>
              ))}
            </ul>
          </ul>
          {/* Docs Navigation */}
          <ul className={cn('flex flex-col gap-y-12')}>
            {docsConfig.sidebarNav.map((item) => (
              <div className={cn('flex flex-col gap-y-4')} key={item.title}>
                <h4
                  className={cn(
                    'inline-flex items-center gap-2',
                    'text-muted-foreground text-sm font-medium',
                  )}
                >
                  {renderIcon(item.icon, { className: 'size-4' })}
                  <span>{item.title}</span>
                </h4>
                <ul className={cn('flex flex-col gap-y-3')}>
                  {item.items?.map((item) => (
                    <li key={item.href}>
                      <MobileLink
                        href={item.href!}
                        aria-label={item.title}
                        onOpenChange={setOpen}
                      >
                        {item.title}
                      </MobileLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
