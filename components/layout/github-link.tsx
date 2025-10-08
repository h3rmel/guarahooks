import * as React from 'react';

import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { getGithubStars } from '@/lib/github';

import { siteConfig } from '@/config/site';

export function GithubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.Github />
        <React.Suspense fallback={<Skeleton className="h-4" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  );
}

export async function StarsCount() {
  const stars = await getGithubStars();

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
    </span>
  );
}
