'use client';

import { useState } from 'react';

import { SessionProvider } from 'next-auth/react';

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

import { useNextAuth } from '@/registry/hooks/use-next-auth';

export default function UseNextAuthDemo() {
  const [refreshInterval, setRefreshInterval] = useState<number | undefined>();
  const [lastSessionChange, setLastSessionChange] = useState<string>('');

  // Check if we're in a NextAuth SessionProvider context
  let hookData;
  let hasError = false;

  try {
    hookData = useNextAuth({
      onSessionChange: (session, status) => {
        const timestamp = new Date().toLocaleTimeString();
        setLastSessionChange(`${status} at ${timestamp}`);
        toast.info(`Session changed: ${status}`, {
          description: `Time: ${timestamp}`,
        });
      },
      refreshInterval,
      onError: (error) => {
        toast.error('Authentication Error', {
          description: error.message,
        });
      },
    });
  } catch (error) {
    hasError = true;
    hookData = {
      session: null,
      status: 'unauthenticated' as const,
      isAuthenticated: false,
      signIn: () => Promise.resolve(undefined),
      signOut: () => Promise.resolve(undefined),
      refresh: () => Promise.resolve(),
    };
  }

  const { session, status, isAuthenticated, signIn, signOut, refresh } =
    hookData;

  // Show NextAuth setup error if not properly configured
  if (hasError) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>NextAuth.js Setup Required</CardTitle>
            <CardDescription>
              This demo requires NextAuth.js to be properly configured
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 rounded-md">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Missing SessionProvider:</strong> The useNextAuth hook
                requires your app to be wrapped in NextAuth's SessionProvider.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Setup Steps:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>
                  Install NextAuth.js:{' '}
                  <code className="text-xs bg-muted px-1 rounded">
                    npm install next-auth
                  </code>
                </li>
                <li>
                  Configure NextAuth.js with your authentication providers
                </li>
                <li>
                  Wrap your app with{' '}
                  <code className="text-xs bg-muted px-1 rounded">
                    &lt;SessionProvider&gt;
                  </code>
                </li>
                <li>
                  The hook will work once NextAuth.js is properly configured
                </li>
              </ol>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                See the{' '}
                <a
                  href="https://next-auth.js.org/getting-started"
                  className="underline"
                >
                  NextAuth.js documentation
                </a>{' '}
                for complete setup instructions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignIn = async () => {
    try {
      toast.loading('Signing in...', { id: 'auth-loading' });
      await signIn();
      toast.success('Signed in successfully!', { id: 'auth-loading' });
    } catch (error) {
      toast.error('Failed to sign in', { id: 'auth-loading' });
    }
  };

  const handleSignOut = async () => {
    try {
      toast.loading('Signing out...', { id: 'auth-loading' });
      await signOut();
      toast.success('Signed out successfully!', { id: 'auth-loading' });
    } catch (error) {
      toast.error('Failed to sign out', { id: 'auth-loading' });
    }
  };

  const handleRefresh = async () => {
    try {
      toast.loading('Refreshing session...', { id: 'refresh-loading' });
      await refresh();
      toast.success('Session refreshed!', { id: 'refresh-loading' });
    } catch (error) {
      toast.error('Failed to refresh session', { id: 'refresh-loading' });
    }
  };

  const toggleAutoRefresh = () => {
    if (refreshInterval) {
      setRefreshInterval(undefined);
      toast.info('Auto-refresh disabled');
    } else {
      setRefreshInterval(30000); // 30 seconds for demo purposes
      toast.info('Auto-refresh enabled (30s interval)');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'authenticated':
        return 'default' as const;
      case 'unauthenticated':
        return 'secondary' as const;
      case 'loading':
        return 'outline' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <SessionProvider>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Authentication Status
              <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
            </CardTitle>
            <CardDescription>
              Current authentication state and session information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Authenticated:</span>
              <Badge variant={isAuthenticated ? 'default' : 'secondary'}>
                {isAuthenticated ? 'Yes' : 'No'}
              </Badge>
            </div>

            {lastSessionChange && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Change:</span>
                <span className="text-sm text-muted-foreground">
                  {lastSessionChange}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-refresh:</span>
              <Badge variant={refreshInterval ? 'default' : 'secondary'}>
                {refreshInterval ? `${refreshInterval / 1000}s` : 'Disabled'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Session Details Card */}
        {isAuthenticated && session?.user && (
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Information about the current authenticated user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {session.user.name?.charAt(0).toUpperCase() ||
                        session.user.email?.charAt(0).toUpperCase() ||
                        'U'}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {session.user.name && (
                    <p className="text-sm font-medium">{session.user.name}</p>
                  )}
                  {session.user.email && (
                    <p className="text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>

              {session.expires && (
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Session Expires:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(session.expires).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>
              Test authentication functionality and session management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {!isAuthenticated ? (
                <Button onClick={handleSignIn} className="flex-1 min-w-[120px]">
                  Sign In
                </Button>
              ) : (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="flex-1 min-w-[120px]"
                >
                  Sign Out
                </Button>
              )}

              <Button
                onClick={handleRefresh}
                variant="secondary"
                disabled={status === 'loading'}
                className="flex-1 min-w-[120px]"
              >
                Refresh Session
              </Button>
            </div>

            <Button
              onClick={toggleAutoRefresh}
              variant="outline"
              className="w-full"
            >
              {refreshInterval ? 'Disable' : 'Enable'} Auto-refresh
            </Button>
          </CardContent>
        </Card>

        {/* Debug Information */}
        {process.env.NODE_ENV === 'development' && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
              <CardDescription>
                Raw session data (development only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
                {JSON.stringify({ session, status, isAuthenticated }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </SessionProvider>
  );
}
