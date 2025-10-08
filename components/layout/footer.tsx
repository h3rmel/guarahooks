import Link from 'next/link';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

const guara = siteConfig.name.slice(0, 5);
const hooks = siteConfig.name.slice(5);

export function Footer() {
  return (
    <footer
      className={cn(
        'w-full h-16 z-10',
        'bg-background/50 backdrop-blur-md',
        'border-t ',
      )}
    >
      <section
        className={cn(
          'max-w-screen-2xl size-full',
          'flex items-center justify-between',
          'mx-auto px-3 2xl:px-0',
        )}
      >
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {guara}
          <span className="font-bold">{hooks}</span>
        </p>
        <p className="text-muted-foreground text-sm">
          Brought to you by{' '}
          <Link
            href={siteConfig.authorUrl}
            className="underline"
            target="_blank"
          >
            h3rmel
          </Link>
          .
        </p>
      </section>
    </footer>
  );
}
