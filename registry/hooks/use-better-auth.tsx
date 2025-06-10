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

export interface DefaultCredentials {
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
  storageKey?: string;
  storage?: StorageLike;
  loginUrl?: string;
  refreshUrl?: string;
  logoutUrl?: string;
  refreshInterval?: number;
  onAuthChange?: (token: string | null, user: TUser | null) => void;
  fetcher?: (
    credentials: TCredentials,
    url: string,
  ) => Promise<BetterAuthResponse<TUser>>;
}

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
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined' || !storage) return null;
    return storage.getItem(`${storageKey}:token`);
  });
  const [user, setUser] = useState<TUser | null>(() => {
    if (typeof window === 'undefined' || !storage) return null;
    const saved = storage.getItem(`${storageKey}:user`);
    return saved ? (JSON.parse(saved) as TUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(
    async (credentials: TCredentials) => {
      setLoading(true);
      setError(null);
      try {
        const fetchFn =
          fetcher ??
          (async (
            creds: TCredentials,
            url: string,
          ): Promise<BetterAuthResponse<TUser>> => {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(creds),
            });

            if (!res.ok) throw new Error('Login failed');

            return (await res.json()) as BetterAuthResponse<TUser>;
          });

        const json = await fetchFn(credentials, loginUrl);
        setToken(json.token);
        setUser(json.user);
        if (storage) {
          storage.setItem(`${storageKey}:token`, json.token);
          storage.setItem(`${storageKey}:user`, JSON.stringify(json.user));
        }
        onAuthChange?.(json.token, json.user);
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storageKey, loginUrl, fetcher],
  );

  const logout = useCallback(() => {
    if (logoutUrl && token) {
      fetch(logoutUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        /* ignore network errors on logout */
      });
    }
    setToken(null);
    setUser(null);
    if (storage) {
      storage.removeItem(`${storageKey}:token`);
      storage.removeItem(`${storageKey}:user`);
    }
    onAuthChange?.(null, null);
  }, [logoutUrl, token, storageKey, storage, onAuthChange]);

  const refresh = useCallback(async () => {
    if (!token || !refreshUrl) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Refresh failed');

      const json = (await res.json()) as BetterAuthResponse<TUser>;
      setToken(json.token);
      setUser(json.user);

      if (storage) {
        storage.setItem(`${storageKey}:token`, json.token);
        storage.setItem(`${storageKey}:user`, JSON.stringify(json.user));
      }
      onAuthChange?.(json.token, json.user);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, refreshUrl, storageKey, storage, onAuthChange]);

  useEffect(() => {
    if (!token || !storage) return;
    storage.setItem(`${storageKey}:token`, token);
    onAuthChange?.(token, user);
  }, [token, storageKey, storage, onAuthChange, user]);

  useEffect(() => {
    if (user === null || !storage) return;
    storage.setItem(`${storageKey}:user`, JSON.stringify(user));
    onAuthChange?.(token, user);
  }, [user, storageKey, storage, onAuthChange, token]);

  useEffect(() => {
    if (!refreshInterval || !refreshUrl) return;
    const id = setInterval(refresh, refreshInterval);
    return () => clearInterval(id);
  }, [refreshInterval, refreshUrl, refresh]);

  const updateUser = useCallback(
    (nextUser: TUser, nextToken?: string) => {
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
    [storageKey, storage, onAuthChange, token],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
