import { BlurFade } from '@/components/magicui/blur-fade';
import { ShowcaseCard } from '@/components/showcase-card';

import { cn } from '@/lib/utils';

import { allShowcases } from '@/.content-collections/generated';

export default function ShowcasePage() {
  return (
    <section
      className={cn(
        'size-full max-w-screen-2xl grow',
        'mx-auto lg:border-x px-3 py-16 lg:px-0',
        'flex flex-col items-center',
      )}
    >
      <hgroup className={cn('mb-4 space-y-2')}>
        <h2 className={cn('text-center text-5xl font-bold tracking-tighter')}>
          Showcase
        </h2>
        <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-muted-foreground">
          Companies and indie-hackers choose guarahooks to build their apps.
        </h3>
      </hgroup>
      <div
        className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3')}
      >
        {allShowcases.map((showcase, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05}>
            <ShowcaseCard {...showcase} href={showcase.slug} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
