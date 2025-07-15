'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import ky, {
  HTTPError,
  KyInstance,
  KyResponse,
  Options,
  TimeoutError,
} from 'ky';

// #region Types & Interfaces

export interface KyConfig extends Options {
  retries?: number;
  timeout?: number;
}

export interface KyOptions extends Options {
  retries?: number;
  timeout?: number;
  immediate?: boolean;
}

export interface KyResult<T> {
  data: T | null;
  error: HTTPError | TimeoutError | Error | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
  abort: () => void;
  aborted: boolean;
}

export interface KyContextValue {
  config: KyConfig;
  updateConfig: (newConfig: Partial<KyConfig>) => void;
  instance: KyInstance;
  request: (url: string, options?: Options) => Promise<KyResponse>;
}

export interface KyProviderProps {
  config?: KyConfig;
  children: ReactNode;
}

// #endregion

const KyContext = createContext<KyContextValue | null>(null);

export function KyProvider({ config = {}, children }: KyProviderProps) {
  const [currentConfig, setCurrentConfig] = useState<KyConfig>(config);
  const instanceRef = useRef<KyInstance | null>(null);

  const updateConfig = useCallback((newConfig: Partial<KyConfig>) => {
    setCurrentConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // Create or update ky instance when config changes
  useEffect(() => {
    instanceRef.current = ky.create(currentConfig);
  }, [currentConfig]);

  const enhancedRequest = useCallback(
    async (url: string, options: Options = {}): Promise<KyResponse> => {
      if (!instanceRef.current) {
        throw new Error('Ky instance not initialized');
      }

      return instanceRef.current(url, options);
    },
    [],
  );

  const contextValue: KyContextValue = {
    config: currentConfig,
    updateConfig,
    instance: instanceRef.current!,
    request: enhancedRequest,
  };

  return (
    <KyContext.Provider value={contextValue}>{children}</KyContext.Provider>
  );
}

export function useKyContext(): KyContextValue {
  const context = useContext(KyContext);
  if (!context) {
    throw new Error('useKy must be used within a KyProvider');
  }
  return context;
}

// Main hook for single requests
export function useKy<T = any>(
  url: string,
  options: KyOptions = {},
): KyResult<T> {
  const { immediate = true, ...requestOptions } = options;
  const { request: contextRequest } = useKyContext();

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<HTTPError | TimeoutError | Error | null>(
    null,
  );
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

  const executeRequest = useCallback(async (): Promise<T | null> => {
    // Abort previous request
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    if (!isMounted.current) return null;

    setLoading(true);
    setError(null);
    setAborted(false);

    try {
      const response = await contextRequest(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      if (!isMounted.current) return null;

      const result = await response.json<T>();

      if (isMounted.current) {
        setData(result);
      }

      return result;
    } catch (err) {
      if (!isMounted.current) return null;

      if (err instanceof DOMException && err.name === 'AbortError') {
        setAborted(true);
      } else {
        setError(err as HTTPError | TimeoutError | Error);
        setData(null);
      }
      return null;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [url, JSON.stringify(requestOptions), contextRequest]);

  useEffect(() => {
    if (!immediate) return;
    executeRequest();
  }, [executeRequest, immediate]);

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
    refetch: executeRequest,
    abort,
    aborted,
  };
}

// Convenience hooks for HTTP methods
export function useKyGet<T = any>(
  url: string,
  options: KyOptions = {},
): KyResult<T> {
  return useKy<T>(url, { ...options, method: 'GET' });
}

export function useKyPost<T = any>(
  url: string,
  data?: any,
  options: KyOptions = {},
): KyResult<T> {
  return useKy<T>(url, { ...options, method: 'POST', json: data });
}

export function useKyPut<T = any>(
  url: string,
  data?: any,
  options: KyOptions = {},
): KyResult<T> {
  return useKy<T>(url, { ...options, method: 'PUT', json: data });
}

export function useKyDelete<T = any>(
  url: string,
  options: KyOptions = {},
): KyResult<T> {
  return useKy<T>(url, { ...options, method: 'DELETE' });
}

export function useKyPatch<T = any>(
  url: string,
  data?: any,
  options: KyOptions = {},
): KyResult<T> {
  return useKy<T>(url, { ...options, method: 'PATCH', json: data });
}

// Hook for multiple requests without state management
export function useKyInstance() {
  const { instance, request } = useKyContext();

  const get = useCallback(
    <T = any,>(url: string, options?: Options) =>
      request(url, { ...options, method: 'GET' }).then((res) => res.json<T>()),
    [request],
  );

  const post = useCallback(
    <T = any,>(url: string, data?: any, options?: Options) =>
      request(url, { ...options, method: 'POST', json: data }).then((res) =>
        res.json<T>(),
      ),
    [request],
  );

  const put = useCallback(
    <T = any,>(url: string, data?: any, options?: Options) =>
      request(url, { ...options, method: 'PUT', json: data }).then((res) =>
        res.json<T>(),
      ),
    [request],
  );

  const del = useCallback(
    <T = any,>(url: string, options?: Options) =>
      request(url, { ...options, method: 'DELETE' }).then((res) =>
        res.json<T>(),
      ),
    [request],
  );

  const patch = useCallback(
    <T = any,>(url: string, data?: any, options?: Options) =>
      request(url, { ...options, method: 'PATCH', json: data }).then((res) =>
        res.json<T>(),
      ),
    [request],
  );

  return {
    instance,
    request,
    get,
    post,
    put,
    delete: del,
    patch,
  };
}
