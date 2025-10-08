import { Hero } from '@/components/sections/hero';
import { HooksDemo } from '@/components/sections/hooks-demo';
import { Showcase } from '@/components/sections/showcase';

import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center grow overflow-x-hidden',
      )}
    >
      <Hero />
      <Showcase />
      <HooksDemo />
    </section>
  );
}
