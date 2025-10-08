'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useMedia } from '@/registry/hooks/use-media';

export default function UseMediaDemo() {
  const isMobile = useMedia('(max-width: 768px)');
  const isDesktop = useMedia('(min-width: 768px)');

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useMedia</CardTitle>
        <CardDescription>
          This component uses the <code>useMedia</code> hook to check if the
          current window matches a media query.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Is mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p>Is desktop: {isDesktop ? 'Yes' : 'No'}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Change the window size to see the values changing.
        </p>
      </CardFooter>
    </Card>
  );
}
