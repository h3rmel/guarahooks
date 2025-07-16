'use client';

import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  FetchProvider,
  useFetch,
  useFetchContext,
  type FetchConfig,
} from '@/registry/hooks/use-fetch';

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

interface PostData {
  title: string;
  body: string;
  userId: number;
}

interface Post extends PostData {
  id: number;
}

// Demo component that shows GET request
function GetDemo() {
  const { data, error, loading, refetch, abort, aborted } =
    useFetch<HttpBinResponse>('/delay/3');

  return (
    <Card>
      <CardHeader>
        <CardTitle>GET Request</CardTitle>
        <CardDescription>
          Fetches data with a 3-second delay to test abort functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={loading ? 'default' : 'secondary'}>
            {loading ? 'Loading...' : 'Idle'}
          </Badge>
          {aborted && <Badge variant="destructive">Aborted</Badge>}
        </div>

        {error && <p className="text-destructive">Error: {error.message}</p>}

        {!loading && !aborted && data && (
          <div>
            <Label className="text-sm font-medium">Response:</Label>
            <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto max-h-32">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
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

// Demo component that shows POST request
function PostDemo() {
  const [title, setTitle] = useState('Test Post');
  const [body, setBody] = useState(
    'This is a test post from the useFetch demo',
  );

  const {
    data,
    error,
    loading,
    refetch: createPost,
  } = useFetch<Post>('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body, userId: 1 }),
    headers: { 'Content-Type': 'application/json' },
    immediate: false,
  });

  const handleSubmit = async () => {
    const result = await createPost();
    if (result) {
      console.log('Post created:', result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>POST Request</CardTitle>
        <CardDescription>
          Creates a new post using JSONPlaceholder API (bypasses baseURL)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post body"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {error && <p className="text-destructive">Error: {error.message}</p>}

        {data && (
          <div>
            <Label className="text-sm font-medium">Created Post:</Label>
            <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Demo component that shows dynamic configuration
function ConfigDemo() {
  const { config, updateConfig } = useFetchContext();
  const [newBaseURL, setNewBaseURL] = useState('');
  const [newTimeout, setNewTimeout] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateConfig = () => {
    const updates: Partial<FetchConfig> = {};

    if (newBaseURL) {
      updates.baseURL = newBaseURL;
    }

    if (newTimeout) {
      updates.timeout = parseInt(newTimeout);
    }

    updateConfig(updates);
    setNewBaseURL('');
    setNewTimeout('');
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Configuration</CardTitle>
        <CardDescription>
          Update global fetch configuration at runtime using useFetchContext
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Current Config:</Label>
          <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto">
            {JSON.stringify(
              {
                baseURL: config.baseURL,
                timeout: config.timeout,
                retries: config.retries,
                retryDelay: config.retryDelay,
              },
              null,
              2,
            )}
          </pre>
        </div>

        <div className="border-t" />

        <div className="space-y-2">
          <Label htmlFor="baseURL">New Base URL</Label>
          <Input
            id="baseURL"
            value={newBaseURL}
            onChange={(e) => setNewBaseURL(e.target.value)}
            placeholder="e.g., https://api.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeout">New Timeout (ms)</Label>
          <Input
            id="timeout"
            type="number"
            value={newTimeout}
            onChange={(e) => setNewTimeout(e.target.value)}
            placeholder="e.g., 5000"
          />
        </div>

        {showSuccess && (
          <div className="flex items-center p-3 rounded-md bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
            <div className="text-sm text-green-800 dark:text-green-200">
              ✓ Configuration updated successfully!
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpdateConfig}
          disabled={!newBaseURL && !newTimeout}
          className="w-full"
        >
          Update Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}

// Main demo component wrapped with provider
function UseFetchDemoContent() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">useFetch Hook Demo</h1>
        <p className="text-muted-foreground">
          Demonstrando as funcionalidades do hook useFetch com provider global,
          retry automático, timeout e controle de abort. Teste os diferentes
          tipos de requisição e configurações dinâmicas.
        </p>
      </div>

      <Tabs defaultValue="get" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="get">GET Request</TabsTrigger>
          <TabsTrigger value="post">POST Request</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="get" className="mt-4">
          <GetDemo />
        </TabsContent>

        <TabsContent value="post" className="mt-4">
          <PostDemo />
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <ConfigDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function UseFetchDemo() {
  return (
    <FetchProvider
      config={{
        baseURL: 'https://httpbin.org',
        timeout: 10000,
        retries: 2,
        retryDelay: 1000,
        headers: {
          'User-Agent': 'useFetch-Demo/1.0',
        },
      }}
    >
      <UseFetchDemoContent />
    </FetchProvider>
  );
}
