import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { siteConfig } from '@/config/site';

const guara = siteConfig.name.slice(0, 5);
const hooks = siteConfig.name.slice(5);

export function HeaderLogo() {
  return (
    <Link href="/" className={cn('flex items-center gap-2 mr-auto lg:mr-0')}>
      <Image
        src="/logo.svg"
        alt={`${siteConfig.name}'s logo`}
        width={32}
        height={32}
      />
      <h1 className={cn('text-base tracking-wide', 'font-title')}>
        <span className="font-light">{guara}</span>
        <span className="font-bold">{hooks}</span>
      </h1>
    </Link>
  );
}
