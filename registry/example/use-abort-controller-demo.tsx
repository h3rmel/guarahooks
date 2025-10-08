'use client';

import React, { useState } from 'react';

import { DownloadIcon, Loader2Icon, RefreshCwIcon, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAbortController } from '@/registry/hooks/use-abort-controller';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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

export default function UseAbortControllerDemo() {
  const [fetchStatus, setFetchStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'aborted'
  >('idle');
  const [data, setData] = useState<Post | HttpBinResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    signal,
    abort,
    reset,
    fetch: abortableFetch,
    aborted,
  } = useAbortController();

  const handleFetch = async () => {
    setFetchStatus('loading');
    setError(null);
    setData(null);

    try {
      // Simulate a slow API call
      const response = await abortableFetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: Post = await response.json();
      setData(result);
      setFetchStatus('success');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setFetchStatus('aborted');
        setError('Request was aborted');
      } else {
        setFetchStatus('error');
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  const handleLongFetch = async () => {
    setFetchStatus('loading');
    setError(null);
    setData(null);

    try {
      // Simulate a very slow API call using httpbin delay
      const response = await abortableFetch('https://httpbin.org/delay/5');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: HttpBinResponse = await response.json();
      setData(result);
      setFetchStatus('success');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setFetchStatus('aborted');
        setError('Long request was aborted');
      } else {
        setFetchStatus('error');
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  const handleAbort = () => {
    abort('User cancelled the request');
  };

  const handleReset = () => {
    reset();
    setFetchStatus('idle');
    setError(null);
    setData(null);
  };

  const getStatusBadge = () => {
    switch (fetchStatus) {
      case 'loading':
        return <Badge variant="secondary">Loading</Badge>;
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'aborted':
        return <Badge variant="outline">Aborted</Badge>;
      default:
        return <Badge variant="outline">Idle</Badge>;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DownloadIcon className="h-5 w-5" />
            Abort Controller Demo
          </CardTitle>
          <CardDescription>
            Demonstrates canceling HTTP requests using AbortController
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status display */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            {getStatusBadge()}
            {aborted && <Badge variant="outline">Controller Aborted</Badge>}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleFetch}
              disabled={fetchStatus === 'loading'}
              variant="default"
            >
              {fetchStatus === 'loading' ? (
                <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <DownloadIcon className="h-4 w-4 mr-2" />
              )}
              Quick Fetch
            </Button>

            <Button
              onClick={handleLongFetch}
              disabled={fetchStatus === 'loading'}
              variant="secondary"
            >
              {fetchStatus === 'loading' ? (
                <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <DownloadIcon className="h-4 w-4 mr-2" />
              )}
              Long Fetch (5s)
            </Button>

            <Button
              onClick={handleAbort}
              disabled={fetchStatus !== 'loading'}
              variant="destructive"
            >
              <XIcon className="h-4 w-4 mr-2" />
              Abort
            </Button>

            <Button
              onClick={handleReset}
              disabled={fetchStatus === 'loading'}
              variant="outline"
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Results display */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {data && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                <strong>Success!</strong> Data received:
              </p>
              <pre className="text-xs bg-white dark:bg-gray-900 p-2 rounded border overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              • <strong>Quick Fetch:</strong> Fast request that completes
              immediately
            </p>
            <p>
              • <strong>Long Fetch:</strong> 5-second delay to test cancellation
            </p>
            <p>
              • <strong>Abort:</strong> Cancel the current request
            </p>
            <p>
              • <strong>Reset:</strong> Create a new controller and clear state
            </p>
            <p>
              • <strong>Auto-abort:</strong> Requests are automatically aborted
              when component unmounts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
