import { Suspense } from 'react';

import Link from 'next/link';

import { ScrollIndicator } from '@/components/design/scroll-indicator';
import { Icons } from '@/components/icons';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { buttonVariants } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { getGithubStars } from '@/lib/github';
import { getHooksCount } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

export async function Hero() {
  const hooksCount = getHooksCount();
  const githubStars = await getGithubStars();

  return (
    <div
      id="hooks-hero"
      className={cn(
        'relative w-full h-[calc(100dvh-112px)]',
        'flex flex-col items-center justify-center grow gap-8',
        'border-b ',
      )}
    >
      <hgroup
        className={cn(
          'text-center',
          'z-10',
          'flex flex-col items-center justify-center gap-4',
          'px-3 lg:px-0',
        )}
      >
        <h1
          className={cn(
            'text-3xl md:text-5xl lg:text-6xl font-bold',
            'max-w-[18ch]',
          )}
        >
          Hooks Library for Software Engineers
        </h1>
        <p className={cn('text-sm lg:text-base max-w-[34ch]')}>
          Free and open-source hooks build with{' '}
          <span className={cn('font-bold')}>React</span> and{' '}
          <span className={cn('font-bold')}>TypeScript</span>. Perfect for your
          next application. <span className={cn('font-bold')}>Shadcn</span>{' '}
          inspired.
        </p>
      </hgroup>
      <div
        className={cn(
          'z-10 flex flex-col lg:flex-row lg:items-center justify-center gap-4 w-3/4',
          'px-4 lg:px-0',
        )}
      >
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'group hover:scale-[1.025]',
          )}
        >
          Get Started
          <Icons.Chevron.Right className="size-4 group-hover:translate-x-1 duration-200 transition-transform" />
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'group hover:scale-[1.025] gap-2',
              )}
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Give it a star!</span>
              <Icons.Star className="size-4 group-hover:scale-[1.25] duration-200 transition-transform" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <Suspense
              fallback={
                <p className="text-sm text-accent-foreground">
                  Counting stars...
                </p>
              }
            >
              <p className="text-sm text-accent-foreground">
                Currently with <NumberTicker value={githubStars} /> stars.
              </p>
            </Suspense>
          </TooltipContent>
        </Tooltip>
      </div>
      <ScrollIndicator
        className={cn(
          'absolute left-8 lg:left-1/2 lg:-translate-x-1/2 bottom-8',
        )}
      />
      <p
        className={cn(
          'absolute bottom-8 right-8',
          'text-sm text-muted-foreground',
        )}
      >
        Currently with {hooksCount} hooks.
      </p>
      <Spotlight
        className="-top-20 left-0 md:-top-40 md:left-80"
        fill="white"
      />
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(640px_circle_at_center,white,transparent)]',
        )}
      />
    </div>
  );
}
