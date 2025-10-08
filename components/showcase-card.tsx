import Link from 'next/link';

import { Icons } from '@/components/icons';

export interface ShowcaseCardProps {
  title: string;
  image: string;
  href: string;
  affiliation?: string;
}
export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex cursor-pointer flex-col gap-2 overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        width={500}
        height={300}
        className="size-full max-h-[300px] rounded-xl object-cover"
      />

      <div className="flex flex-col">
        <div className="group inline-flex cursor-pointer items-center justify-start gap-1 text-xl font-semibold text-neutral-700 duration-200 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200">
          {title}
          <Icons.Chevron.Right className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <p className="text-sm text-neutral-400">{affiliation}</p>
      </div>
    </Link>
  );
}
