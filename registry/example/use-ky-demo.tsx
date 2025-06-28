'use client';

import React, { useState } from 'react';

import { AlertCircleIcon, Loader2Icon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useKy } from '@/registry/hooks/use-ky';

export default function UseKyDemoComponent() {
  const [url, setUrl] = useState(
    'https://jsonplaceholder.typicode.com/posts/1',
  );
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const kyClient = useKy({ prefixUrl: 'https://jsonplaceholder.typicode.com' });

  const handleGetRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await kyClient.get(
        url.replace('https://jsonplaceholder.typicode.com/', ''),
      );
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-sm w-full">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>useKy GET Request</CardTitle>
          <CardDescription>Fetch data using ky</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://jsonplaceholder.typicode.com/posts/1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGetRequest}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </>
            ) : (
              'Send GET Request'
            )}
          </Button>
        </CardFooter>
      </Card>

      {error != null && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      )}

      {data != null && (
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle>Response Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-zinc-950 p-4 rounded-md overflow-auto max-h-60">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
