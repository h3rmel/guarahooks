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

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// #region Types & Interfaces

export interface AxiosConfig extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
}

export interface AxiosOptions extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
  immediate?: boolean;
}

export interface AxiosResult<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
  abort: () => void;
  aborted: boolean;
}

export interface AxiosContextValue {
  config: AxiosConfig;
  updateConfig: (newConfig: Partial<AxiosConfig>) => void;
  instance: AxiosInstance;
  request: <T = any>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export interface AxiosProviderProps {
  config?: AxiosConfig;
  children: ReactNode;
}

// #endregion

const AxiosContext = createContext<AxiosContextValue | null>(null);

export function AxiosProvider({ config = {}, children }: AxiosProviderProps) {
  const [currentConfig, setCurrentConfig] = useState<AxiosConfig>(config);
  const instanceRef = useRef<AxiosInstance | null>(null);

  const updateConfig = useCallback((newConfig: Partial<AxiosConfig>) => {
    setCurrentConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // Create or update axios instance when config changes
  useEffect(() => {
    const { retries, retryDelay, ...axiosConfig } = currentConfig;

    instanceRef.current = axios.create(axiosConfig);

    // Add request interceptor for retry logic
    instanceRef.current.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    );

    // Add response interceptor for error handling
    instanceRef.current.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );

    return () => {
      instanceRef.current = null;
    };
  }, [currentConfig]);

  const enhancedRequest = useCallback(
    async <T = any,>(
      requestConfig: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> => {
      const {
        retries = currentConfig.retries ?? 0,
        retryDelay = currentConfig.retryDelay ?? 1000,
        ...axiosConfig
      } = requestConfig as AxiosRequestConfig & {
        retries?: number;
        retryDelay?: number;
      };

      if (!instanceRef.current) {
        throw new Error('Axios instance not initialized');
      }

      let lastError: AxiosError | null = null;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const response = await instanceRef.current.request<T>(axiosConfig);
          return response;
        } catch (error) {
          lastError = error as AxiosError;

          // Don't retry on abort or client errors (4xx)
          if (
            axios.isCancel(error) ||
            ((error as AxiosError).response?.status &&
              (error as AxiosError).response!.status >= 400 &&
              (error as AxiosError).response!.status < 500)
          ) {
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

      throw lastError || new Error('Unknown axios error');
    },
    [currentConfig],
  );

  const contextValue: AxiosContextValue = {
    config: currentConfig,
    updateConfig,
    instance: instanceRef.current!,
    request: enhancedRequest,
  };

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useAxiosContext(): AxiosContextValue {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
}

// Main hook for single requests
export function useAxios<T = any>(
  config: AxiosRequestConfig & { immediate?: boolean } = {},
): AxiosResult<T> {
  const { immediate = true, ...requestConfig } = config;
  const { request: contextRequest } = useAxiosContext();

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
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
      const response = await contextRequest<T>({
        ...requestConfig,
        signal: controller.signal,
      });

      if (!isMounted.current) return null;

      if (isMounted.current) {
        setData(response.data);
      }

      return response.data;
    } catch (err) {
      if (!isMounted.current) return null;

      if (axios.isCancel(err)) {
        setAborted(true);
      } else {
        setError(err as AxiosError);
        setData(null);
      }
      return null;
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [contextRequest, JSON.stringify(requestConfig)]);

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
export function useAxiosGet<T = any>(
  url: string,
  config: AxiosOptions = {},
): AxiosResult<T> {
  return useAxios<T>({ ...config, method: 'GET', url });
}

export function useAxiosPost<T = any>(
  url: string,
  data?: any,
  config: AxiosOptions = {},
): AxiosResult<T> {
  return useAxios<T>({ ...config, method: 'POST', url, data });
}

export function useAxiosPut<T = any>(
  url: string,
  data?: any,
  config: AxiosOptions = {},
): AxiosResult<T> {
  return useAxios<T>({ ...config, method: 'PUT', url, data });
}

export function useAxiosDelete<T = any>(
  url: string,
  config: AxiosOptions = {},
): AxiosResult<T> {
  return useAxios<T>({ ...config, method: 'DELETE', url });
}

export function useAxiosPatch<T = any>(
  url: string,
  data?: any,
  config: AxiosOptions = {},
): AxiosResult<T> {
  return useAxios<T>({ ...config, method: 'PATCH', url, data });
}

// Hook for multiple requests without state management
export function useAxiosInstance() {
  const { instance, request } = useAxiosContext();

  const get = useCallback(
    <T = any,>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'GET', url }),
    [request],
  );

  const post = useCallback(
    <T = any,>(url: string, data?: any, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'POST', url, data }),
    [request],
  );

  const put = useCallback(
    <T = any,>(url: string, data?: any, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'PUT', url, data }),
    [request],
  );

  const del = useCallback(
    <T = any,>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'DELETE', url }),
    [request],
  );

  const patch = useCallback(
    <T = any,>(url: string, data?: any, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'PATCH', url, data }),
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
