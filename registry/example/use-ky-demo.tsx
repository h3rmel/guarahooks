'use client';

import * as React from 'react';
import { useState } from 'react';

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
  KyProvider,
  useKyContext,
  useKyGet,
  useKyInstance,
  useKyPost,
  type KyConfig,
} from '@/registry/hooks/use-ky';

interface HttpBinResponse {
  args: Record<string, string>;
  data: string;
  files: Record<string, string>;
  form: Record<string, string>;
  headers: Record<string, string>;
  json: Record<string, any> | null;
  origin: string;
  url: string;
}

interface PostData {
  title: string;
  body: string;
  userId: number;
}

interface PostResponse extends PostData {
  id: number;
}

function GetDemo() {
  const { data, error, loading, refetch, abort, aborted } =
    useKyGet<HttpBinResponse>('delay/3');

  return (
    <Card>
      <CardHeader>
        <CardTitle>GET Request</CardTitle>
        <CardDescription>
          Returns data after a 3-second delay to demonstrate abort
          functionality.
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
          <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto max-h-32">
            {JSON.stringify(data, null, 2)}
          </pre>
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

function PostDemo() {
  const [title, setTitle] = useState('Test Title');
  const [body, setBody] = useState('Test body content');

  const {
    data,
    error,
    loading,
    refetch: createPost,
  } = useKyPost<HttpBinResponse>(
    'post',
    { title, body, userId: 1 },
    { immediate: false },
  );

  const handleSubmit = async () => {
    const result = await createPost();
    if (result) {
      console.log('Post response:', result);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>POST Request</CardTitle>
        <CardDescription>Posts data to /post endpoint</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Body</Label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        {error && <p className="text-destructive">Error: {error.message}</p>}
        {data && (
          <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
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

function MultipleRequestsDemo() {
  const { get, post } = useKyInstance();
  const [users, setUsers] = useState<HttpBinResponse[] | null>(null);
  const [postResp, setPostResp] = useState<HttpBinResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, postData] = await Promise.all([
        get<HttpBinResponse[]>('delay/1'),
        post<HttpBinResponse>('post', { title: 'x', body: 'y', userId: 1 }),
      ]);
      setUsers(userData);
      setPostResp(postData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multiple Requests</CardTitle>
        <CardDescription>
          Use instance for parallel GET and POST requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-destructive">Error: {error}</p>}
        {users && (
          <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto max-h-32">
            {JSON.stringify(users, null, 2)}
          </pre>
        )}
        {postResp && (
          <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto max-h-32">
            {JSON.stringify(postResp, null, 2)}
          </pre>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleFetch} disabled={loading} className="w-full">
          {loading ? 'Loading...' : 'Fetch Multiple'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function ConfigDemo() {
  const { config, updateConfig } = useKyContext();
  const [newPrefix, setNewPrefix] = useState('');
  const [newTimeout, setNewTimeout] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = () => {
    const updates: Partial<KyConfig> = {};
    if (newPrefix) updates.prefixUrl = newPrefix;
    if (newTimeout) updates.timeout = parseInt(newTimeout);
    updateConfig(updates);
    setNewPrefix('');
    setNewTimeout('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Config</CardTitle>
        <CardDescription>Dynamically update KyProvider config</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <pre className="mt-2 p-3 rounded-md bg-muted text-sm overflow-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
        <div className="space-y-2">
          <Label>Prefix URL</Label>
          <Input
            value={newPrefix}
            onChange={(e) => setNewPrefix(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Timeout (ms)</Label>
          <Input
            value={newTimeout}
            onChange={(e) => setNewTimeout(e.target.value)}
          />
        </div>
        {showSuccess && <Badge>Config Updated!</Badge>}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpdate}
          disabled={!newPrefix && !newTimeout}
          className="w-full"
        >
          Update Config
        </Button>
      </CardFooter>
    </Card>
  );
}

function UseKyDemoContent() {
  return (
    <Tabs defaultValue="get" className="w-full">
      <TabsList>
        <TabsTrigger value="get">GET</TabsTrigger>
        <TabsTrigger value="post">POST</TabsTrigger>
        <TabsTrigger value="multiple">Multiple</TabsTrigger>
        <TabsTrigger value="config">Config</TabsTrigger>
      </TabsList>
      <TabsContent value="get">
        <GetDemo />
      </TabsContent>
      <TabsContent value="post">
        <PostDemo />
      </TabsContent>
      <TabsContent value="multiple">
        <MultipleRequestsDemo />
      </TabsContent>
      <TabsContent value="config">
        <ConfigDemo />
      </TabsContent>
    </Tabs>
  );
}

export default function UseKyDemo() {
  return (
    <KyProvider
      config={{
        prefixUrl: 'https://httpbin.org',
        timeout: 10000,
        retry: 2,
        headers: { 'User-Agent': 'useKy-Demo/1.0' },
      }}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">useKy Hook Demo</h1>
        <UseKyDemoContent />
      </div>
    </KyProvider>
  );
}
