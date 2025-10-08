'use client';

import { usePathname } from 'next/navigation';

import { renderIcon } from '@/components/icons';
import { DocsSidebarItem } from '@/components/layout/docs-sidebar-item';

import { cn } from '@/lib/utils';

import { NavItemWithChildren } from '@/types/docs';

export type DocsSidebarProps = {
  items: NavItemWithChildren[];
};

export function DocsSidebar({ items }: DocsSidebarProps) {
  const pathname = usePathname();

  if (items.length === 0) return null;

  return (
    <ul className={cn('flex flex-col items-start gap-8')}>
      {items.map((item, index) => (
        <li key={index} className={cn('flex flex-col gap-2 w-full')}>
          <h4
            className={cn(
              'inline-flex gap-2 items-center',
              'text-sm text-muted-foreground',
              'ml-2',
            )}
          >
            {renderIcon(item.icon, { className: 'size-4' })}
            <span>{item.title}</span>
          </h4>
          {item.items && item.items.length > 0 && (
            <DocsSidebarItem items={item.items} pathname={pathname} />
          )}
        </li>
      ))}
    </ul>
  );
}
