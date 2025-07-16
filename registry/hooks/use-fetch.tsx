'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

// #region Types & Interfaces
export interface FetchConfig extends Omit<RequestInit, 'body' | 'signal'> {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface FetchOptions<TBody = BodyInit | null>
  extends Omit<RequestInit, 'body'> {
  body?: TBody;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  parse?: (response: Response) => Promise<any>;
}

export interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
  abort: () => void;
  aborted: boolean;
}

interface FetchContextValue {
  config: FetchConfig;
  updateConfig: (newConfig: Partial<FetchConfig>) => void;
  fetch: (url: string, options?: FetchOptions) => Promise<Response>;
}

export interface FetchProviderProps {
  config?: FetchConfig;
  children: ReactNode;
}

// #endregion

const FetchContext = createContext<FetchContextValue | null>(null);

export function FetchProvider({ config = {}, children }: FetchProviderProps) {
  const [currentConfig, setCurrentConfig] = useState<FetchConfig>(config);

  const updateConfig = useCallback((newConfig: Partial<FetchConfig>) => {
    setCurrentConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const enhancedFetch = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      const {
        timeout = currentConfig.timeout,
        retries = currentConfig.retries ?? 0,
        retryDelay = currentConfig.retryDelay ?? 1000,
        ...fetchOptions
      } = options;

      // Construct full URL
      const fullUrl =
        currentConfig.baseURL && !url.startsWith('http')
          ? `${currentConfig.baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
          : url;

      // Merge headers
      const headers = new Headers(currentConfig.headers);
      if (fetchOptions.headers) {
        const optionHeaders = new Headers(fetchOptions.headers);
        optionHeaders.forEach((value, key) => headers.set(key, value));
      }

      // Create fetch options
      const finalOptions: RequestInit = {
        ...currentConfig,
        ...fetchOptions,
        headers,
      };

      // Use provided signal or create new one
      const shouldCreateController = !fetchOptions.signal;
      const controller = shouldCreateController ? new AbortController() : null;
      const signal = fetchOptions.signal || controller?.signal;

      // Add signal to options
      finalOptions.signal = signal;

      // Retry logic
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          // Add timeout
          let timeoutId: NodeJS.Timeout | null = null;
          if (timeout && controller) {
            timeoutId = setTimeout(() => controller.abort(), timeout);
          }

          const response = await fetch(fullUrl, finalOptions);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          return response;
        } catch (error) {
          lastError = error as Error;

          // Don't retry on abort or non-network errors
          if (error instanceof DOMException && error.name === 'AbortError') {
            throw error;
          }

          // If this is the last attempt, throw the error
          if (attempt === retries) {
            throw error;
          }

          // Wait before retry
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }

      throw lastError || new Error('Unknown fetch error');
    },
    [currentConfig],
  );

  const contextValue: FetchContextValue = {
    config: currentConfig,
    updateConfig,
    fetch: enhancedFetch,
  };

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
}

export function useFetchContext(): FetchContextValue {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error('useFetch must be used within a FetchProvider');
  }

  return context;
}

export function useFetch<
  T = any,
  TBody extends BodyInit | null = BodyInit | null,
>(
  url: string,
  options: FetchOptions<TBody> & { immediate?: boolean } = {},
): FetchResult<T> {
  const { immediate = true, parse, ...fetchOptions } = options;
  const { fetch: contextFetch } = useFetchContext();

  const [data, setData] = useState<T | null>(null);
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

  const fetchData = useCallback(async (): Promise<T | null> => {
    // Abort previous request
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    if (!isMounted.current) return null;

    setLoading(true);
    setError(null);
    setAborted(false);

    try {
      const response = await contextFetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!isMounted.current) return null;

      const result = parse ? await parse(response) : await response.json();

      if (isMounted.current) {
        setData(result);
      }

      return result;
    } catch (err) {
      if (!isMounted.current) return null;

      if (err instanceof DOMException && err.name === 'AbortError') {
        setAborted(true);
      } else {
        setError(err as Error);
        setData(null);
      }
      return null;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [url, JSON.stringify(fetchOptions), parse, contextFetch]);

  useEffect(() => {
    if (!immediate) return;
    fetchData();
  }, [fetchData, immediate]);

  const abort = useCallback(() => {
    abortController.current?.abort();
    if (isMounted.current) {
      setAborted(true);
      setLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
    abort,
    aborted,
  };
}
