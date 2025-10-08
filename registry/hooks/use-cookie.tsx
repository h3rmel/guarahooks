import { useCallback, useMemo } from 'react';

export type CookieOptions = {
  path?: string;
  expires?: Date | string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

/**
 * Type-safe React hook for managing cookies.
 * Provides methods to get, set, and remove cookies.
 *
 * @param key The cookie key
 * @param initialValue Optional initial value for the cookie
 * @returns [value, setCookie, removeCookie]
 */
export function useCookie<T = string>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: T, options?: CookieOptions) => void, () => void] {
  // Helper to check if running in browser
  const isBrowser = typeof document !== 'undefined';

  // Parse cookie string to object
  const getCookies = useCallback((): Record<string, string> => {
    if (!isBrowser) return {};
    return document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const [k, ...v] = cookie.split('=');
        acc[decodeURIComponent(k)] = decodeURIComponent(v.join('='));
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [isBrowser]);

  // Set cookie
  const setCookie = useCallback(
    (val: T | undefined, options: CookieOptions = {}) => {
      if (!isBrowser) return;
      let encodedValue: string;
      if (typeof val === 'string') {
        encodedValue = encodeURIComponent(val);
      } else {
        encodedValue = encodeURIComponent(JSON.stringify(val));
      }
      let cookieStr = `${encodeURIComponent(key)}=${encodedValue}`;
      if (options.path) cookieStr += `; path=${options.path}`;
      if (options.expires)
        cookieStr += `; expires=${options.expires instanceof Date ? options.expires.toUTCString() : options.expires}`;
      if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
      if (options.domain) cookieStr += `; domain=${options.domain}`;
      if (options.secure) cookieStr += '; secure';
      if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;
      document.cookie = cookieStr;
    },
    [isBrowser, key],
  );

  // Remove cookie
  const removeCookie = useCallback(() => {
    setCookie(undefined, { path: '/', expires: new Date(0) });
  }, [setCookie]);

  // Get cookie value (and create if missing)
  const value = useMemo(() => {
    const cookies = getCookies();
    if (!(key in cookies)) {
      if (initialValue !== undefined) {
        setCookie(initialValue);
        return initialValue;
      } else {
        setCookie(undefined);
        return undefined;
      }
    }
    try {
      return JSON.parse(cookies[key]) as T;
    } catch {
      return cookies[key] as T;
    }
  }, [getCookies, key, initialValue, setCookie]);

  return [value, setCookie, removeCookie];
}
