'use client';

import { useCallback, useEffect } from 'react';

// Types
interface PageTitleOptions {
  suffix?: string;
  separator?: string;
}

interface UsePageTitleReturn {
  setTitle: (title: string) => void;
  resetTitle: () => void;
}

export function usePageTitle(options?: PageTitleOptions): UsePageTitleReturn {
  const suffix = options?.suffix || '';
  const separator = options?.separator || ' | ';
  const originalTitle = typeof document !== 'undefined' ? document.title : '';

  const formatTitle = useCallback(
    (title: string) => {
      if (suffix) {
        return `${title}${separator}${suffix}`;
      }
      return title;
    },
    [suffix, separator],
  );

  const setTitle = useCallback(
    (title: string) => {
      if (typeof document !== 'undefined') {
        document.title = formatTitle(title);
      }
    },
    [formatTitle],
  );

  const resetTitle = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.title = originalTitle;
    }
  }, [originalTitle]);

  // Reset title on unmount
  useEffect(() => {
    return () => {
      resetTitle();
    };
  }, [resetTitle]);

  return {
    setTitle,
    resetTitle,
  };
}
