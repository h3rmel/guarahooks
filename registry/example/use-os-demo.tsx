'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { OS, useOS } from '@/registry/hooks/use-os';

export default function UseOSDemo() {
  const os = useOS();

  console.log(os);

  const osLabel: Record<OS, string> = {
    [OS.Undetermined]: 'Unable to determine the operating system.',
    [OS.MacOS]: 'MacOS',
    [OS.IOS]: 'iOS',
    [OS.Windows]: 'Windows',
    [OS.Android]: 'Android',
    [OS.Linux]: 'Linux',
  };

  return (
    <Card className="w-full max-w-md relative">
      <CardHeader>
        <CardTitle>useOS</CardTitle>
        <CardDescription>
          This hook detects the user's operating system.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">Operating System detected:</p>
        <div className="font-bold">{osLabel[os]}</div>
      </CardContent>
      <CardFooter className="gap-x-1">
        <p className="text-sm text-muted-foreground">
          Value returned from useOS:
        </p>
        <p className="text-sm">{os}</p>
      </CardFooter>
    </Card>
  );
}
