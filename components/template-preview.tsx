import { ReactNode } from 'react';

import Link from 'next/link';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'outline',
        }),
        'not-prose group relative w-full gap-2',
      )}
      href={href}
      target="_blank"
    >
      {children}
      <Icons.ExternalLink className="size-4" />
    </Link>
  );
}
