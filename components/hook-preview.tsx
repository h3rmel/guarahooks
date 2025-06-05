import * as React from 'react';

import { HookWrapper } from '@/components/hook-wrapper';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import { Index } from '@/__registry__';

interface RegistryItem {
  name: string;
  description: string;
  type: string;
  component: React.ComponentType;
  files: Array<{
    path: string;
    type: string;
    target: string;
  }>;
  registryDependencies?: unknown;
  meta?: unknown;
}

interface HookPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: 'center' | 'start' | 'end';
  preview?: boolean;
}

export function HookPreview({
  name,
  children,
  className,
  align = 'center',
  preview = false,
  ...props
}: HookPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = React.useMemo(() => {
    const Hook = (Index[name] as RegistryItem)?.component;

    if (!Hook) {
      console.error(`Hook with name "${name}" not found in registry.`);

      return (
        <p className="text-sm text-muted-foreground">
          Hook{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found in registry.
        </p>
      );
    }

    return <Hook />;
  }, [name]);

  return (
    <div
      className={cn(
        'relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]',
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </div>
        )}
        <TabsContent value="preview">
          <HookWrapper name={name}>
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.Loader.One className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </HookWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
