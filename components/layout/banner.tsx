'use client';

import Link from 'next/link';

import posthog from 'posthog-js';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

export function Banner() {
  return (
    <section
      className={cn(
        'relative top-0',
        'bg-blue-600 text-foreground',
        'group transition-all duration-300',
        'py-3 md:py-0',
      )}
    >
      <div
        className={cn(
          'container md:h-12 text-center',
          'flex flex-col md:flex-row items-center justify-center gap-4',
          'mx-auto',
        )}
      >
        <Link
          href="/docs/changelog"
          onClick={() => posthog.capture('banner_cta_clicked')}
          className="inline-flex text-xs leading-normal md:text-sm max-w-[36ch] md:max-w-full"
        >
          <span className="font-medium">
            ✨ Introducing to you: new hooks 🐺 - Authentication and Forms made
            easy.
          </span>
          <Icons.Chevron.Right
            className={cn(
              'size-7 md:size-5 ml-1 my-auto lg:my-0',
              'transition-all duration-300 ease-out group-hover:translate-x-1',
            )}
          />
        </Link>
      </div>
      <hr
        className={cn(
          'absolute bottom-0',
          'h-px w-full m-0',
          'bg-neutral-200/30',
        )}
      />
    </section>
  );
}
