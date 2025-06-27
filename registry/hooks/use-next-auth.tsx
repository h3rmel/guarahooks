'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

export interface UseNextAuthReturn<T extends Session = Session> {
  session: T | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  isAuthenticated: boolean;
  signIn: typeof signIn;
  signOut: typeof signOut;
  refresh: () => Promise<void>;
}

export interface UseNextAuthOptions<T extends Session = Session> {
  onSessionChange?: (
    session: T | null,
    status: 'authenticated' | 'unauthenticated' | 'loading',
  ) => void;
  /** Interval in milliseconds to refresh the session automatically */
  refreshInterval?: number;
  onError?: (error: Error) => void;
}

/**
 * Enhanced hook for NextAuth.js session management with additional features
 *
 * @template T - Custom session interface extending NextAuth Session
 * @param options - Configuration options for the hook
 * @returns Enhanced session object with additional utilities
 */
export function useNextAuth<T extends Session = Session>(
  options: UseNextAuthOptions<T> = {},
): UseNextAuthReturn<T> {
  const { onSessionChange, refreshInterval, onError } = options;
  const { data, status, update } = useSession();
  const previousRef = useRef<T | null>(null);

  const safeSignIn = useCallback<typeof signIn>(
    async (...args) => {
      try {
        return await signIn(...args);
      } catch (err) {
        onError?.(err as Error);
        throw err;
      }
    },
    [onError],
  );

  const safeSignOut = useCallback<typeof signOut>(
    async (...args) => {
      try {
        return await signOut(...args);
      } catch (err) {
        onError?.(err as Error);
        throw err;
      }
    },
    [onError],
  );

  const refresh = useCallback(async () => {
    await update();
  }, [update]);

  // Auto-refresh session at specified intervals
  useEffect(() => {
    if (!refreshInterval) return;
    const id = setInterval(refresh, refreshInterval);
    return () => clearInterval(id);
  }, [refreshInterval, refresh]);

  // Session change detection and callbacks
  useEffect(() => {
    if (onSessionChange && previousRef.current !== data) {
      onSessionChange(data as T | null, status);
      previousRef.current = data as T | null;
    }
  }, [data, status, onSessionChange]);

  // Debug logging in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[useNextAuth] Session:', data);
      console.log('[useNextAuth] Status:', status);
    }
  }, [data, status]);

  return {
    session: data as T | null,
    status,
    isAuthenticated: status === 'authenticated',
    signIn: safeSignIn,
    signOut: safeSignOut,
    refresh,
  };
}
