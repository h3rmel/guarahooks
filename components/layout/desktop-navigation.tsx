import Link from 'next/link';

import { CommandMenu } from '@/components/command-menu';
import { GithubLink } from '@/components/layout/github-link';
import { HeaderLogo } from '@/components/layout/header-logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { docsConfig } from '@/config/docs';

export function DesktopNavigation() {
  return (
    <section
      className={cn(
        'relative hidden lg:flex',
        'max-w-screen-2xl w-full h-16',
        'mx-auto px-3 2xl:px-0',
        'items-center justify-between',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        <HeaderLogo />
        {/* Navigation Links */}
        <ul className={cn('lg:flex items-center gap-2', 'hidden')}>
          {docsConfig.mainNav.map((item) => (
            <li
              key={item.title}
              className={cn(
                'h-full w-auto',
                'flex items-center justify-center',
              )}
            >
              <Link
                href={item.href!}
                title={item.title}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-muted-foreground',
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn('flex items-center gap-4')}>
        <CommandMenu />
        <hr className="h-6 border-l" />
        <GithubLink />
        <hr className="h-6 border-l" />
        <ThemeToggle />
      </div>
    </section>
  );
}
