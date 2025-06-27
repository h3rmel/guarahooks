'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useBetterAuth } from '@/registry/hooks/use-better-auth';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface DemoCredentials extends Record<string, string | number | boolean> {
  email: string;
  password: string;
}

// Mock API responses for demo purposes
const mockLogin = async (credentials: DemoCredentials) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  if (
    credentials.email === 'user@example.com' &&
    credentials.password === 'password'
  ) {
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://github.com/shadcn.png',
      },
    };
  }

  throw new Error('Invalid credentials');
};

const mockRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    token: 'refreshed-jwt-token-' + Date.now(),
    user: {
      id: '1',
      name: 'John Doe',
      email: 'user@example.com',
      avatar: 'https://github.com/shadcn.png',
    },
  };
};

export default function UseBetterAuthDemo() {
  const [credentials, setCredentials] = useState<DemoCredentials>({
    email: 'user@example.com',
    password: 'password',
  });
  const [storageType, setStorageType] = useState<
    'localStorage' | 'sessionStorage'
  >('localStorage');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastAuthChange, setLastAuthChange] = useState<string>('');

  // Main auth hook with localStorage
  const mainAuth = useBetterAuth<DemoUser, DemoCredentials>({
    storageKey: 'demo-auth-main',
    storage: typeof window !== 'undefined' ? window[storageType] : undefined,
    fetcher: async (creds) => mockLogin(creds),
    refreshInterval: autoRefresh ? 10000 : undefined, // 10 seconds for demo
    onAuthChange: (token, user) => {
      const timestamp = new Date().toLocaleTimeString();
      setLastAuthChange(
        `${token ? 'Authenticated' : 'Unauthenticated'} at ${timestamp}`,
      );

      if (token && user) {
        toast.success('Authentication successful!', {
          description: `Welcome, ${user.name}!`,
        });
      } else {
        toast.info('Logged out', {
          description: 'Session ended',
        });
      }
    },
  });

  // Secondary auth hook with custom fetcher for comparison
  const customAuth = useBetterAuth<DemoUser, DemoCredentials>({
    storageKey: 'demo-auth-custom',
    fetcher: async (creds) => {
      // Custom fetcher that simulates different API response
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        token: 'custom-token-' + Date.now(),
        user: {
          id: '2',
          name: 'Custom User',
          email: creds.email,
        },
      };
    },
  });

  const handleLogin = async () => {
    try {
      await mainAuth.login(credentials);
    } catch (error) {
      toast.error('Login failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleRefresh = async () => {
    try {
      // For demo, we'll simulate a refresh by updating the user
      const refreshedData = await mockRefresh();
      mainAuth.updateUser(refreshedData.user, refreshedData.token);
      toast.success('Session refreshed!');
    } catch (error) {
      toast.error('Refresh failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleUpdateUser = () => {
    if (mainAuth.user) {
      const updatedUser = {
        ...mainAuth.user,
        name: mainAuth.user.name + ' (Updated)',
      };
      mainAuth.updateUser(updatedUser);
      toast.success('User updated!');
    }
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast.info(`Auto-refresh ${!autoRefresh ? 'enabled' : 'disabled'}`, {
      description: !autoRefresh
        ? 'Token will refresh every 10 seconds'
        : undefined,
    });
  };

  const clearError = () => {
    mainAuth.clearError();
    customAuth.clearError();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Authentication Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Main Authentication
            <div className="flex gap-2">
              <Badge
                variant={mainAuth.isAuthenticated ? 'default' : 'secondary'}
              >
                {mainAuth.isAuthenticated
                  ? 'Authenticated'
                  : 'Not Authenticated'}
              </Badge>
              {mainAuth.loading && <Badge variant="outline">Loading</Badge>}
            </div>
          </CardTitle>
          <CardDescription>
            Demonstration of the main auth hook with customizable storage and
            auto-refresh
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!mainAuth.isAuthenticated ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="user@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="password"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleLogin} disabled={mainAuth.loading}>
                  {mainAuth.loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setStorageType(
                      storageType === 'localStorage'
                        ? 'sessionStorage'
                        : 'localStorage',
                    )
                  }
                >
                  Storage: {storageType}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                <p>
                  <strong>Demo credentials:</strong>
                </p>
                <p>Email: user@example.com</p>
                <p>Password: password</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {mainAuth.user?.avatar && (
                  <img
                    src={mainAuth.user.avatar}
                    alt={mainAuth.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{mainAuth.user?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mainAuth.user?.email}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono bg-muted p-2 rounded border overflow-hidden">
                <p>
                  <strong>Token:</strong> {mainAuth.token?.substring(0, 50)}...
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={mainAuth.logout} variant="outline">
                  Logout
                </Button>
                <Button onClick={handleRefresh} variant="outline">
                  Refresh Session
                </Button>
                <Button onClick={handleUpdateUser} variant="outline">
                  Update User
                </Button>
                <Button onClick={toggleAutoRefresh} variant="outline">
                  {autoRefresh ? 'Disable' : 'Enable'} Auto-refresh
                </Button>
              </div>
            </div>
          )}

          {mainAuth.error && (
            <div className="p-3 border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 rounded-md">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-800 dark:text-red-200">
                  <strong>Error:</strong> {mainAuth.error.message}
                </p>
                <Button onClick={clearError} variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
            </div>
          )}

          {lastAuthChange && (
            <div className="text-xs text-muted-foreground">
              <strong>Last change:</strong> {lastAuthChange}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Comparison Tabs */}
      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="storage">Storage Types</TabsTrigger>
          <TabsTrigger value="custom-fetcher">Custom Fetcher</TabsTrigger>
          <TabsTrigger value="features">Advanced Features</TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Comparison</CardTitle>
              <CardDescription>
                Compare localStorage vs sessionStorage behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">localStorage</h4>
                  <p className="text-sm text-muted-foreground">
                    Persists across browser sessions
                  </p>
                  <Badge
                    variant={
                      storageType === 'localStorage' ? 'default' : 'outline'
                    }
                  >
                    {storageType === 'localStorage' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">sessionStorage</h4>
                  <p className="text-sm text-muted-foreground">
                    Cleared when tab closes
                  </p>
                  <Badge
                    variant={
                      storageType === 'sessionStorage' ? 'default' : 'outline'
                    }
                  >
                    {storageType === 'sessionStorage' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Switch storage types and notice how authentication persists
                differently. Try logging in, switching tabs, or refreshing the
                page.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-fetcher" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Fetcher Example</CardTitle>
              <CardDescription>
                Demonstrates how to use a custom fetcher function
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Custom Auth State</p>
                  <p className="text-sm text-muted-foreground">
                    {customAuth.isAuthenticated
                      ? `Logged in as ${customAuth.user?.name}`
                      : 'Not authenticated'}
                  </p>
                </div>
                <Badge
                  variant={customAuth.isAuthenticated ? 'default' : 'secondary'}
                >
                  {customAuth.isAuthenticated ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex gap-2">
                {!customAuth.isAuthenticated ? (
                  <Button
                    onClick={() => customAuth.login(credentials)}
                    disabled={customAuth.loading}
                  >
                    {customAuth.loading
                      ? 'Logging in...'
                      : 'Login with Custom Fetcher'}
                  </Button>
                ) : (
                  <Button onClick={customAuth.logout} variant="outline">
                    Logout
                  </Button>
                )}
              </div>

              {customAuth.token && (
                <div className="text-xs font-mono bg-muted p-2 rounded border">
                  <p>
                    <strong>Custom Token:</strong>{' '}
                    {customAuth.token.substring(0, 30)}...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
              <CardDescription>
                Overview of all hook capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={mainAuth.isAuthenticated ? 'default' : 'outline'}
                    >
                      Authentication State
                    </Badge>
                    <span className="text-sm">
                      {mainAuth.isAuthenticated ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={autoRefresh ? 'default' : 'outline'}>
                      Auto Refresh
                    </Badge>
                    <span className="text-sm">
                      {autoRefresh ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        storageType === 'localStorage' ? 'default' : 'secondary'
                      }
                    >
                      Storage Type
                    </Badge>
                    <span className="text-sm">{storageType}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={mainAuth.loading ? 'default' : 'outline'}>
                      Loading State
                    </Badge>
                    <span className="text-sm">
                      {mainAuth.loading ? 'Loading' : 'Idle'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={mainAuth.error ? 'destructive' : 'outline'}>
                      Error Handling
                    </Badge>
                    <span className="text-sm">
                      {mainAuth.error ? 'Has Error' : 'No Errors'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Cross-tab Sync</Badge>
                    <span className="text-sm">Automatic</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
