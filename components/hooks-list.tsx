import Link from 'next/link';

import { cn } from '@/lib/utils';

import { docsConfig } from '@/config/docs';

import { buttonVariants } from './ui/button';

interface Hook {
  title: string;
  href: string;
  label?: string;
}

interface Category {
  title: string;
  icon?: string;
  hooks: Hook[];
}

export function HooksList() {
  const categories: Category[] = docsConfig.sidebarNav
    .filter((section) => section.title !== 'Getting Started')
    .map((section) => ({
      title: section.title,
      icon: section.icon,
      hooks: (
        section.items?.filter((item) =>
          item.href?.startsWith('/docs/hooks/'),
        ) || []
      ).map((item) => ({
        title: item.title,
        href: item.href!,
        label: item.label,
      })),
    }))
    .filter((category) => category.hooks.length > 0);

  return (
    <div className={cn('mt-6', 'flex flex-col gap-y-6')}>
      {categories.map((category) => (
        <div key={category.title} className={cn('flex flex-col gap-y-4')}>
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-8 lg:gap-x-16 lg:gap-y-6',
            )}
          >
            {category.hooks.map((hook) => (
              <Link
                href={hook.href}
                key={hook.href}
                className={cn(
                  'text-lg font-medium text-muted-foreground',
                  'hover:underline',
                )}
              >
                {hook.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
