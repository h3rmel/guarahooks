'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// Types
export interface UseAxiosProps {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  config?: AxiosRequestConfig;
  interceptors?: AxiosInterceptors;
}

export interface AxiosInterceptors {
  request?: {
    onFulfilled?: (
      config: AxiosRequestConfig,
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: AxiosError) => void;
  };
  response?: {
    onFulfilled?: (
      response: AxiosResponse,
    ) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (error: AxiosError) => void;
  };
}

export interface UseAxiosReturn<TData = void> {
  instance: AxiosInstance;
  loading: boolean;
  error: AxiosError | null;
  data: TData | null;
  get: <TReturn = TData>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TReturn>>;
  post: <TReturn = TData, TBody = void>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TReturn>>;
  put: <TReturn = TData, TBody = void>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TReturn>>;
  delete: <TReturn = TData>(
    url: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TReturn>>;
  patch: <TReturn = TData, TBody = void>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TReturn>>;
  setHeaders: (headers: Record<string, string>) => void;
  /** Reset headers to an empty object */
  resetHeaders: () => void;
  /** Reset base URL to the current prop value */
  resetBaseURL: () => void;
  setInterceptors: (interceptors: AxiosInterceptors) => void;
  /** Reset interceptors to the current prop value */
  resetInterceptors: () => void;
  cancelRequest: () => void;
  resetError: () => void;
  resetData: () => void;
  setBaseURL: (url: string) => void;
  /** Update the default request timeout */
  setTimeout: (ms: number) => void;
  /** Reset the request timeout to the current prop value */
  resetTimeout: () => void;
  /** Merge additional Axios configuration options */
  setConfig: (config: AxiosRequestConfig) => void;
  /** Reset the Axios config to the current prop value */
  resetConfig: () => void;
}

export function useAxios<TData = void>({
  baseURL = '',
  headers = {},
  timeout = 10000,
  config = {},
  interceptors,
}: UseAxiosProps = {}): UseAxiosReturn<TData> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<TData | null>(null);
  const [baseURLState, setBaseURLState] = useState(baseURL);
  const [timeoutState, setTimeoutState] = useState(timeout);
  const [configState, setConfigState] = useState(config);
  const [headersState, setHeadersState] = useState(headers);

  // Sync baseURL prop changes
  useEffect(() => {
    setBaseURLState(baseURL);
  }, [baseURL]);

  useEffect(() => {
    setTimeoutState(timeout);
  }, [timeout]);

  useEffect(() => {
    setConfigState(config);
  }, [config]);

  useEffect(() => {
    setHeadersState(headers);
  }, [headers]);
  const [interceptorsState, setInterceptorsState] = useState<
    AxiosInterceptors | undefined
  >(interceptors);

  // Create a ref to store the axios instance to prevent recreation on each render
  const instanceRef = useRef<AxiosInstance | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Initialize axios instance
  useEffect(() => {
    const instance = axios.create({
      baseURL: baseURLState,
      headers: headersState,
      timeout: timeoutState,
      ...configState,
    });

    if (interceptorsState?.request) {
      instance.interceptors.request.use(
        interceptorsState.request.onFulfilled,
        interceptorsState.request.onRejected,
      );
    }

    if (interceptorsState?.response) {
      instance.interceptors.response.use(
        interceptorsState.response.onFulfilled,
        interceptorsState.response.onRejected,
      );
    }

    instanceRef.current = instance;

    return () => {
      controllerRef.current?.abort();
      instanceRef.current = null;
      controllerRef.current = null;
    };
  }, [
    baseURLState,
    headersState,
    timeoutState,
    configState,
    interceptorsState,
  ]);

  // Get the current instance
  const getInstance = useCallback((): AxiosInstance => {
    if (!instanceRef.current) {
      const instance = axios.create({
        baseURL: baseURLState,
        headers: headersState,
        timeout: timeoutState,
        ...configState,
      });

      if (interceptorsState?.request) {
        instance.interceptors.request.use(
          interceptorsState.request.onFulfilled,
          interceptorsState.request.onRejected,
        );
      }

      if (interceptorsState?.response) {
        instance.interceptors.response.use(
          interceptorsState.response.onFulfilled,
          interceptorsState.response.onRejected,
        );
      }

      instanceRef.current = instance;
    }
    return instanceRef.current;
  }, [
    baseURLState,
    headersState,
    timeoutState,
    configState,
    interceptorsState,
  ]);

  // Helper to handle request execution
  const executeRequest = useCallback(
    async <TReturn = TData, TBody = void>(
      method: string,
      url: string,
      data?: TBody,
      customConfig?: AxiosRequestConfig,
    ): Promise<AxiosResponse<TReturn>> => {
      setLoading(true);
      setError(null);

      try {
        const instance = getInstance();
        const controller = new AbortController();
        controllerRef.current = controller;

        const response = await instance.request<TReturn>({
          method,
          url,
          data,
          signal: controller.signal,
          ...customConfig,
        });

        setData(response.data as TData);
        return response;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        throw axiosError;
      } finally {
        setLoading(false);
        controllerRef.current = null;
      }
    },
    [getInstance],
  );

  // Request methods
  const get = useCallback(
    <TReturn = TData,>(url: string, config?: AxiosRequestConfig) => {
      return executeRequest<TReturn>('get', url, undefined, config);
    },
    [executeRequest],
  );

  const post = useCallback(
    <TReturn = TData, TBody = void>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig,
    ) => {
      return executeRequest<TReturn>('post', url, data, config);
    },
    [executeRequest],
  );

  const put = useCallback(
    <TReturn = TData, TBody = void>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig,
    ) => {
      return executeRequest<TReturn>('put', url, data, config);
    },
    [executeRequest],
  );

  const del = useCallback(
    <TReturn = TData,>(url: string, config?: AxiosRequestConfig) => {
      return executeRequest<TReturn>('delete', url, undefined, config);
    },
    [executeRequest],
  );

  const patch = useCallback(
    <TReturn = TData, TBody = void>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig,
    ) => {
      return executeRequest<TReturn>('patch', url, data, config);
    },
    [executeRequest],
  );

  const setHeaders = useCallback(
    (newHeaders: Record<string, string>) => {
      setHeadersState((prev) => ({
        ...prev,
        ...newHeaders,
      }));

      const instance = getInstance();
      instance.defaults.headers = {
        ...instance.defaults.headers,
        ...newHeaders,
      } as Record<string, string>;
    },
    [getInstance],
  );

  const resetHeaders = useCallback(() => {
    setHeadersState({});

    const instance = getInstance();
    instance.defaults.headers = {} as Record<string, string>;
  }, [getInstance]);

  const setInterceptors = useCallback((next: AxiosInterceptors) => {
    setInterceptorsState(next);
  }, []);

  const resetInterceptors = useCallback(() => {
    setInterceptorsState(interceptors);
  }, [interceptors]);

  const resetBaseURL = useCallback(() => {
    setBaseURLState(baseURL);

    const instance = getInstance();
    instance.defaults.baseURL = baseURL;
  }, [baseURL, getInstance]);

  const cancelRequest = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const resetData = useCallback(() => {
    setData(null);
  }, []);

  const setBaseURL = useCallback((url: string) => {
    setBaseURLState(url);
  }, []);

  const setTimeout = useCallback((ms: number) => {
    setTimeoutState(ms);
  }, []);

  const resetTimeout = useCallback(() => {
    setTimeoutState(timeout);

    const instance = getInstance();
    instance.defaults.timeout = timeout;
  }, [timeout, getInstance]);

  const setConfig = useCallback((next: AxiosRequestConfig) => {
    setConfigState((prev) => ({
      ...prev,
      ...next,
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(config);

    const instance = getInstance();
    Object.assign(instance.defaults, config);
  }, [config, getInstance]);

  return {
    instance: getInstance(),
    loading,
    error,
    data,
    get,
    post,
    put,
    delete: del,
    patch,
    setHeaders,
    resetHeaders,
    resetBaseURL,
    setInterceptors,
    resetInterceptors,
    cancelRequest,
    resetError,
    resetData,
    setBaseURL,
    setTimeout,
    resetTimeout,
    setConfig,
    resetConfig,
  };
}
