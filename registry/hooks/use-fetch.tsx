'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFetchOptions<TBody = BodyInit | null, TReturn = void>
  extends Omit<RequestInit, 'body'> {
  body?: TBody;
  immediate?: boolean;
  parse?: (response: Response) => Promise<TReturn>;
  initialData?: TReturn;
}

export interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
  abort: () => void;
  aborted: boolean;
}

export function useFetch<
  TReturn = void,
  TBody extends BodyInit | null = BodyInit | null,
>(
  url: string,
  options: UseFetchOptions<TBody, TReturn> = {},
): UseFetchResult<TReturn> {
  const { immediate = true, parse, initialData, ...fetchOptions } = options;

  const [data, setData] = useState<TReturn | null>(initialData ?? null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aborted, setAborted] = useState<boolean>(false);

  const abortController = useRef<AbortController | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      abortController.current?.abort();
    };
  }, []);

  const fetchData = useCallback(async () => {
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    const signal = controller.signal;

    setLoading(true);
    setError(null);
    setAborted(false);

    try {
      const response = await fetch(url, { ...fetchOptions, signal });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = parse
        ? await parse(response)
        : ((await response.json()) as TReturn);

      if (isMounted.current) {
        setData(result);
      }

      return result;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setAborted(true);
      } else if (isMounted.current) {
        setError(err as Error);
        setData(null);
      }
      return null;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [url, JSON.stringify(fetchOptions), parse]);

  useEffect(() => {
    if (!immediate) return;
    fetchData();
  }, [fetchData, immediate]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const abort = useCallback(() => {
    abortController.current?.abort();
    setAborted(true);
  }, []);

  return { data, error, loading, refetch, abort, aborted };
}
