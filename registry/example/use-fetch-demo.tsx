'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useFetch } from '@/registry/hooks/use-fetch';

interface HttpBinResponse {
  args: Record<string, string>;
  data: string;
  files: Record<string, string>;
  form: Record<string, string>;
  headers: Record<string, string>;
  json: Record<string, string | number | boolean | null> | null;
  origin: string;
  url: string;
}

export default function UseFetchDemo() {
  // Using a slow endpoint to simulate network delay for testing abort
  const { data, error, loading, refetch, abort, aborted } =
    useFetch<HttpBinResponse>('https://httpbin.org/delay/5');

  return (
    <Card className="relative max-w-lg w-full">
      <CardHeader>
        <CardTitle>useFetch</CardTitle>
        <CardDescription>
          Demonstrates the <code>useFetch</code> hook with a 5s artificial delay
          so you can test the Abort button.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-destructive">Error: {error.message}</p>}
        {!loading && !aborted && data && (
          <pre className="p-2 rounded-md border border-bg-zinc-800 bg-zinc-950 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        {aborted && <p className="text-destructive">Request aborted</p>}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={abort} disabled={!loading}>
          Abort
        </Button>
        <Button onClick={refetch} disabled={loading}>
          Refetch
        </Button>
      </CardFooter>
    </Card>
  );
}
