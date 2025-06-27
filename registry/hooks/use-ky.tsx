'use client';

import { useCallback, useMemo } from 'react';

import ky, { HTTPError, Options, TimeoutError } from 'ky';

export type UseKyOptions = Options;

export interface UseKyReturn {
  instance: ReturnType<typeof ky.create>;
  get: <T = unknown>(url: string, options?: Options) => Promise<T>;
  post: <T = unknown>(url: string, options?: Options) => Promise<T>;
  put: <T = unknown>(url: string, options?: Options) => Promise<T>;
  delete: <T = unknown>(url: string, options?: Options) => Promise<T>;
  patch: <T = unknown>(url: string, options?: Options) => Promise<T>;
  extend: (options: Options) => ReturnType<typeof ky.create>;
  HTTPError: typeof HTTPError;
  TimeoutError: typeof TimeoutError;
}

export function useKy(options?: UseKyOptions): UseKyReturn {
  const instance = useMemo(() => ky.create(options), [options]);

  const get = useCallback(
    <T = unknown,>(url: string, opts?: Options): Promise<T> => {
      return instance.get(url, opts).json<T>();
    },
    [instance],
  );

  const post = useCallback(
    <T = unknown,>(url: string, opts?: Options): Promise<T> => {
      return instance.post(url, opts).json<T>();
    },
    [instance],
  );

  const put = useCallback(
    <T = unknown,>(url: string, opts?: Options): Promise<T> => {
      return instance.put(url, opts).json<T>();
    },
    [instance],
  );

  const del = useCallback(
    <T = unknown,>(url: string, opts?: Options): Promise<T> => {
      return instance.delete(url, opts).json<T>();
    },
    [instance],
  );

  const patch = useCallback(
    <T = unknown,>(url: string, opts?: Options): Promise<T> => {
      return instance.patch(url, opts).json<T>();
    },
    [instance],
  );

  const extend = useCallback(
    (opts: Options) => {
      return instance.extend(opts);
    },
    [instance],
  );

  return {
    instance,
    get,
    post,
    put,
    delete: del,
    patch,
    extend,
    HTTPError,
    TimeoutError,
  };
}
