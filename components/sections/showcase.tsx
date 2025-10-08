import { allShowcases } from 'content-collections';

import { Marquee } from '@/components/magicui/marquee';
import { ShowcaseCard } from '@/components/showcase-card';

import { cn } from '@/lib/utils';

export function Showcase() {
  return (
    <section
      id="showcase"
      className={cn('max-w-screen-2xl w-full', 'px-4 py-16 lg:px-0')}
    >
      <hgroup className={cn('mb-8')}>
        <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
          Showcase
        </h2>
        <h3 className="mx-auto text-balance text-center text-lg font-medium tracking-tight text-muted-foreground">
          Companies and indie-hackers choose guarahooks to build their apps.
        </h3>
      </hgroup>
      <div className="relative max-w-screen-xl mx-auto flex flex-col">
        <Marquee className="max-w-screen [--duration:40s]">
          {allShowcases
            .filter((showcase) => showcase.featured)
            .map((showcase, idx) => (
              <ShowcaseCard key={idx} {...showcase} href={showcase.slug} />
            ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
