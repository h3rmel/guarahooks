import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

import { NavItemWithChildren } from '@/types/docs';

type DocsSidebarNavItemsProps = {
  items: NavItemWithChildren[];
  pathname: string | null;
};

export function DocsSidebarItem({ items, pathname }: DocsSidebarNavItemsProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('relative', 'grow flex flex-col gap-1')}>
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'inline-flex items-center justify-between',
              'text-foreground text-left text-sm',
              'pr-1 py-1 pl-2 rounded-md border border-transparent',
              'transition-all duration-200',
              'hover:bg-accent/50 hover:border-border',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href &&
                'bg-accent/50 text-foreground border-border',
            )}
          >
            <span className="transition-all duration-200 group-hover:translate-x-0.5">
              {item.title}
            </span>
            {item.label && (
              <Badge variant="secondary" className="rounded-sm">
                {item.label}
              </Badge>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'inline-flex items-center justify-between',
              'text-muted-foreground tracking-tight font-mono text-sm p-1.5',
              item.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            <span className="">{item.title}</span>
            {item.label && (
              <Badge variant="secondary" className="rounded-sm">
                {item.label}
              </Badge>
            )}
          </span>
        ),
      )}
    </div>
  );
}
