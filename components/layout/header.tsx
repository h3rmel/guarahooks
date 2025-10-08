import { DesktopNavigation } from '@/components/layout/desktop-navigation';
import { MobileNavigation } from '@/components/layout/mobile-navigation';

import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-50',
        'w-full',
        'bg-background/50 backdrop-blur-md',
        'border-b',
        'flex flex-col',
      )}
    >
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
}
