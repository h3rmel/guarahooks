'use client';

import * as React from 'react';

import { copyToClipboardWithMeta } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import { useConfig } from '@/hooks/use-config';
import { useMounted } from '@/hooks/use-mounted';
import { NpmCommands } from '@/types/unist';

import { Icons } from './icons';

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<'pre'> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);
  const mounted = useMounted();

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || 'pnpm';

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copyToClipboardWithMeta(command, {
      name: 'copy_npm_command',
      properties: {
        command,
        pm: packageManager,
      },
    });
    setHasCopied(true);
  }, [packageManager, tabs]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative w-full mt-6 max-h-[650px] overflow-hidden border rounded-md bg-zinc-950 dark:bg-zinc-900',
      )}
    >
      <Tabs
        className="w-full border-none gap-0"
        defaultValue={packageManager}
        onValueChange={(value) => {
          console.log('value', value, packageManager);
          setConfig({
            ...config,
            packageManager: value as 'pnpm' | 'npm' | 'yarn' | 'bun',
          });
        }}
      >
        <div className="flex items-start justify-between border-b border-zinc-800 bg-zinc-900 w-full">
          <TabsList className="h-11 border-b-0 gap-3 bg-transparent p-1 pl-1 w-fit">
            {Object.entries(tabs).map(([key, value]) => {
              return (
                <TabsTrigger key={key} value={key}>
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent
              key={key}
              value={key}
              className="mt-0 p-0 bg-background dark:bg-zinc-900 text-foreground"
            >
              <pre className="px-4 py-5 overflow-x-auto">
                <code
                  className="relative font-mono text-sm leading-none overflow-x-auto"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className={
          'absolute right-1 top-1 z-10 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50'
        }
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <Icons.Check className="size-4" />
        ) : (
          <Icons.Copy className="size-4" />
        )}
      </Button>
    </div>
  );
}
