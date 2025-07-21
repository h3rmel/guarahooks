import { DocsSidebar } from '@/components/layout/docs-sidebar';

import { cn } from '@/lib/utils';

import { docsConfig } from '@/config/docs';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'size-full max-w-screen-2xl px-3 2xl:px-0',
        'flex gap-16 xl:gap-32',
        'mx-auto w-full',
      )}
    >
      <aside
        id="docs-sidebar"
        className={cn(
          'sticky top-[96px] h-[calc(100vh-128px)]',
          'hidden lg:block',
          'my-8',
        )}
      >
        <div className={cn('no-scrollbar h-full overflow-auto')}>
          <DocsSidebar items={docsConfig.sidebarNav} />
        </div>
      </aside>
      <div className={cn('flex-1 min-w-0')}>{children}</div>
    </section>
  );
}
