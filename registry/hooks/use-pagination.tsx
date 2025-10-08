'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

// Types for options and return value
interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
}

export function usePagination(
  totalItems: number,
  options: UsePaginationOptions = {},
): UsePaginationResult {
  const { initialPage = 1, initialPageSize = 10 } = options;

  const [page, setPageState] = useState<number>(initialPage);
  const [pageSize, setPageSizeState] = useState<number>(initialPageSize);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize],
  );

  useEffect(() => {
    // Ensure current page is within bounds when totalPages changes
    setPageState((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const setPage = useCallback(
    (newPage: number) => {
      setPageState((prev) => Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const prevPage = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  const setPageSize = useCallback((newSize: number) => {
    setPageSizeState(newSize);
  }, []);

  return {
    page,
    pageSize,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    setPageSize,
  };
}
