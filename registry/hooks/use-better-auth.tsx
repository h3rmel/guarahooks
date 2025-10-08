'use client';

import { useCallback, useEffect, useState } from 'react';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface BetterAuthResponse<TUser> {
  token: string;
  user: TUser;
}

export interface DefaultCredentials
  extends Record<string, string | number | boolean> {
  email: string;
  password: string;
}

export interface UseBetterAuthReturn<
  TUser,
  TCredentials extends Record<string, string | number | boolean>,
> {
  token: string | null;
  user: TUser | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  login: (credentials: TCredentials) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  updateUser: (user: TUser, token?: string) => void;
  clearError: () => void;
}

export interface UseBetterAuthOptions<
  TUser,
  TCredentials extends Record<string, string | number | boolean>,
> {
  /** Storage key prefix for storing authentication data. Defaults to 'better-auth' */
  storageKey?: string;
  /** Custom storage implementation. Defaults to localStorage */
  storage?: StorageLike;
  /** Login endpoint URL. Defaults to '/api/login' */
  loginUrl?: string;
  /** Token refresh endpoint URL */
  refreshUrl?: string;
  /** Logout endpoint URL */
  logoutUrl?: string;
  /** Auto-refresh interval in milliseconds */
  refreshInterval?: number;
  /** Callback fired when authentication state changes */
  onAuthChange?: (token: string | null, user: TUser | null) => void;
  /** Custom fetcher function for authentication requests */
  fetcher?: (
    credentials: TCredentials,
    url: string,
  ) => Promise<BetterAuthResponse<TUser>>;
}

/**
 * A flexible authentication hook that provides login, logout, token refresh, and user management.
 *
 * Features:
 * - Customizable storage (localStorage, sessionStorage, or custom implementation)
 * - Automatic token refresh with configurable intervals
 * - SSR-safe with proper hydration handling
 * - Type-safe with generic user and credentials types
 * - Custom fetcher support for different API implementations
 * - Cross-tab synchronization through storage events
 * - Error handling with clear error states
 *
 * @example
 * ```tsx
 * // Basic usage
 * const auth = useBetterAuth<User>({
 *   loginUrl: '/api/auth/login',
 *   refreshUrl: '/api/auth/refresh',
 * });
 *
 * // Login
 * await auth.login({ email: 'user@example.com', password: 'password' });
 *
 * // Check authentication
 * if (auth.isAuthenticated) {
 *   console.log('User:', auth.user);
 * }
 *
 * // Logout
 * auth.logout();
 * ```
 *
 * @example
 * ```tsx
 * // With custom storage and fetcher
 * const auth = useBetterAuth<User, CustomCredentials>({
 *   storage: sessionStorage,
 *   storageKey: 'my-app-auth',
 *   refreshInterval: 300000, // 5 minutes
 *   fetcher: async (credentials, url) => {
 *     const response = await customApiCall(url, credentials);
 *     return { token: response.accessToken, user: response.userData };
 *   },
 *   onAuthChange: (token, user) => {
 *     console.log('Auth state changed:', { token, user });
 *   },
 * });
 * ```
 *
 * @param options Configuration options for the authentication hook
 * @returns Authentication state and methods
 */
export function useBetterAuth<
  TUser,
  TCredentials extends Record<
    string,
    string | number | boolean
  > = DefaultCredentials,
>(
  options: UseBetterAuthOptions<TUser, TCredentials> = {},
): UseBetterAuthReturn<TUser, TCredentials> {
  const {
    storageKey = 'better-auth',
    storage = typeof window !== 'undefined' ? localStorage : undefined,
    loginUrl = '/api/login',
    refreshUrl,
    logoutUrl,
    refreshInterval,
    onAuthChange,
    fetcher,
  } = options;

  // Debug logging in development
  const debugLog = useCallback((message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[useBetterAuth] ${message}`, data || '');
    }
  }, []);

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined' || !storage) return null;
    try {
      const storedToken = storage.getItem(`${storageKey}:token`);
      debugLog('Initial token loaded from storage', {
        hasToken: !!storedToken,
      });
      return storedToken;
    } catch (error) {
      debugLog('Error loading initial token', error);
      return null;
    }
  });

  const [user, setUser] = useState<TUser | null>(() => {
    if (typeof window === 'undefined' || !storage) return null;
    try {
      const saved = storage.getItem(`${storageKey}:user`);
      const userData = saved ? (JSON.parse(saved) as TUser) : null;
      debugLog('Initial user loaded from storage', { hasUser: !!userData });
      return userData;
    } catch (error) {
      debugLog('Error loading initial user', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(
    async (credentials: TCredentials) => {
      debugLog('Login attempt started', { loginUrl });
      setLoading(true);
      setError(null);

      try {
        const fetchFn =
          fetcher ??
          (async (
            creds: TCredentials,
            url: string,
          ): Promise<BetterAuthResponse<TUser>> => {
            debugLog('Using default fetcher for login');
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(creds),
            });

            if (!res.ok) {
              const errorText = await res.text().catch(() => 'Unknown error');
              throw new Error(`Login failed: ${res.status} ${errorText}`);
            }

            return (await res.json()) as BetterAuthResponse<TUser>;
          });

        const json = await fetchFn(credentials, loginUrl);
        debugLog('Login successful', {
          hasToken: !!json.token,
          hasUser: !!json.user,
        });

        setToken(json.token);
        setUser(json.user);

        if (storage) {
          storage.setItem(`${storageKey}:token`, json.token);
          storage.setItem(`${storageKey}:user`, JSON.stringify(json.user));
          debugLog('Auth data saved to storage');
        }

        onAuthChange?.(json.token, json.user);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Login failed');
        debugLog('Login failed', error);
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [storageKey, loginUrl, fetcher, storage, onAuthChange, debugLog],
  );

  const logout = useCallback(() => {
    debugLog('Logout initiated', { hasLogoutUrl: !!logoutUrl });

    if (logoutUrl && token) {
      fetch(logoutUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch((error) => {
        debugLog('Logout API call failed (ignored)', error);
      });
    }

    setToken(null);
    setUser(null);

    if (storage) {
      storage.removeItem(`${storageKey}:token`);
      storage.removeItem(`${storageKey}:user`);
      debugLog('Auth data cleared from storage');
    }

    onAuthChange?.(null, null);
  }, [logoutUrl, token, storageKey, storage, onAuthChange, debugLog]);

  const refresh = useCallback(async () => {
    if (!token || !refreshUrl) {
      debugLog('Refresh skipped', {
        hasToken: !!token,
        hasRefreshUrl: !!refreshUrl,
      });
      return;
    }

    debugLog('Token refresh started');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Token refresh failed: ${res.status} ${errorText}`);
      }

      const json = (await res.json()) as BetterAuthResponse<TUser>;
      debugLog('Token refresh successful');

      setToken(json.token);
      setUser(json.user);

      if (storage) {
        storage.setItem(`${storageKey}:token`, json.token);
        storage.setItem(`${storageKey}:user`, JSON.stringify(json.user));
      }

      onAuthChange?.(json.token, json.user);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Token refresh failed');
      debugLog('Token refresh failed', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token, refreshUrl, storageKey, storage, onAuthChange, debugLog]);

  const updateUser = useCallback(
    (nextUser: TUser, nextToken?: string) => {
      debugLog('User update', { hasNewToken: !!nextToken });

      setUser(nextUser);
      if (nextToken !== undefined) {
        setToken(nextToken);
        if (storage) {
          storage.setItem(`${storageKey}:token`, nextToken);
        }
      }
      if (storage) {
        storage.setItem(`${storageKey}:user`, JSON.stringify(nextUser));
      }
      onAuthChange?.(nextToken ?? token, nextUser);
    },
    [storageKey, storage, onAuthChange, token, debugLog],
  );

  const clearError = useCallback(() => {
    debugLog('Error cleared');
    setError(null);
  }, [debugLog]);

  // Sync token to storage and trigger auth change
  useEffect(() => {
    if (!token || !storage) return;
    storage.setItem(`${storageKey}:token`, token);
    onAuthChange?.(token, user);
  }, [token, storageKey, storage, onAuthChange, user]);

  // Sync user to storage and trigger auth change
  useEffect(() => {
    if (user === null || !storage) return;
    storage.setItem(`${storageKey}:user`, JSON.stringify(user));
    onAuthChange?.(token, user);
  }, [user, storageKey, storage, onAuthChange, token]);

  // Auto-refresh setup
  useEffect(() => {
    if (!refreshInterval || !refreshUrl) return;

    debugLog('Auto-refresh enabled', { interval: refreshInterval });
    const id = setInterval(refresh, refreshInterval);
    return () => {
      debugLog('Auto-refresh disabled');
      clearInterval(id);
    };
  }, [refreshInterval, refreshUrl, refresh, debugLog]);

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated: token !== null,
    login,
    logout,
    refresh,
    updateUser,
    clearError,
  };
}
