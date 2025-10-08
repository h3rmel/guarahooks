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
  AxiosProvider,
  useAxiosContext,
  useAxiosGet,
  useAxiosInstance,
  useAxiosPost,
  type AxiosConfig,
} from '@/registry/hooks/use-axios';

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

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

function GetDemo() {
  const { data, error, loading, refetch, abort, aborted } =
    useAxiosGet<HttpBinResponse>('/delay/5');

  return (
    <Card>
      <CardHeader>
        <CardTitle>GET Request</CardTitle>
        <CardDescription>
          Fetches data with a 5-second delay to test abort functionality
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

function PostDemo() {
  const [title, setTitle] = useState('Test Post');
  const [body, setBody] = useState(
    'This is a test post from the useAxios demo',
  );

  const {
    data,
    error,
    loading,
    refetch: createPost,
  } = useAxiosPost<Post>(
    'https://jsonplaceholder.typicode.com/posts',
    {
      title,
      body,
      userId: 1,
    },
    {
      immediate: false,
    },
  );

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

function MultipleRequestsDemo() {
  const { get, post } = useAxiosInstance();
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMultipleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [usersResponse, postsResponse] = await Promise.all([
        get<User[]>('https://jsonplaceholder.typicode.com/users?_limit=3'),
        get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5'),
      ]);

      setUsers(usersResponse.data);
      setPosts(postsResponse.data);
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
          Fetch multiple data sources simultaneously using useAxiosInstance
          (bypasses baseURL)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-destructive">Error: {error}</p>}

        {users && (
          <div>
            <Label className="text-sm font-medium">Users:</Label>
            <div className="mt-2 space-y-2">
              {users.map((user) => (
                <div key={user.id} className="p-2 rounded-md bg-muted text-sm">
                  <strong>{user.name}</strong> ({user.username}) - {user.email}
                </div>
              ))}
            </div>
          </div>
        )}

        {posts && (
          <div>
            <Label className="text-sm font-medium">Posts:</Label>
            <div className="mt-2 space-y-2">
              {posts.map((post) => (
                <div key={post.id} className="p-2 rounded-md bg-muted text-sm">
                  <strong>{post.title}</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.body.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={fetchMultipleData}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Loading...' : 'Fetch Multiple Data'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function ConfigDemo() {
  const { config, updateConfig } = useAxiosContext();
  const [newBaseURL, setNewBaseURL] = useState('');
  const [newTimeout, setNewTimeout] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateConfig = () => {
    const updates: Partial<AxiosConfig> = {};

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
          Update global Axios configuration at runtime using useAxiosContext
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

function UseAxiosDemoContent() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">useAxios Hook Demo</h1>
        <p className="text-muted-foreground">
          Demonstrando as funcionalidades do hook useAxios com provider global,
          retry automático, abort controller e múltiplas requisições.
        </p>
      </div>

      <Tabs defaultValue="get" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="get">GET Request</TabsTrigger>
          <TabsTrigger value="post">POST Request</TabsTrigger>
          <TabsTrigger value="multiple">Multiple</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="get" className="mt-4">
          <GetDemo />
        </TabsContent>

        <TabsContent value="post" className="mt-4">
          <PostDemo />
        </TabsContent>

        <TabsContent value="multiple" className="mt-4">
          <MultipleRequestsDemo />
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <ConfigDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function UseAxiosDemo() {
  return (
    <AxiosProvider
      config={{
        baseURL: 'https://httpbin.org',
        timeout: 10000,
        retries: 2,
        retryDelay: 1000,
        headers: {
          'User-Agent': 'useAxios-Demo/1.0',
        },
      }}
    >
      <UseAxiosDemoContent />
    </AxiosProvider>
  );
}
