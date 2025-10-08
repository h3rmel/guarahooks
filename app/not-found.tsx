'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export default function NotFound() {
  const router = useRouter();

  return (
    <section
      className={cn('flex flex-col items-center justify-center gap-4 grow')}
    >
      <div
        className={cn(
          'flex items-center justify-center',
          'size-16 rounded-full',
          'bg-destructive/10',
        )}
      >
        <Icons.Alert className="size-8 text-destructive mb-0.5" />
      </div>
      <hgroup className={cn('text-center', 'flex flex-col items-center')}>
        <h1 className={cn('text-2xl lg:text-3xl font-bold')}>Page not found</h1>
        <p className={cn('text-sm text-muted-foreground')}>
          The page you are looking for doesn&apos;t exist.
        </p>
      </hgroup>
      <div className={cn('flex items-center justify-center gap-2')}>
        <Button variant="secondary" onClick={() => router.back()}>
          <Icons.Chevron.Left className="size-4" />
          Go Back
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: 'default' }))}>
          Take me home
        </Link>
      </div>
    </section>
  );
}
