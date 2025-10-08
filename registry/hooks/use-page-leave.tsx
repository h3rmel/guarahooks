'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type PageLeaveOptions = {
  confirmationMessage?: string;
  showConfirmation?: boolean;
};

type PageLeaveResult = {
  isPageLeft: boolean;
  onPageLeave: (callback: () => void) => void;
};

export function usePageLeave(options: PageLeaveOptions = {}): PageLeaveResult {
  const { confirmationMessage, showConfirmation = false } = options;

  // Track if user left the page (switched tabs)
  const [isPageLeft, setIsPageLeft] = useState(false);

  // Store the callback to execute when user leaves
  const callbackRef = useRef<(() => void) | null>(null);

  // Method to set the callback
  const onPageLeave = useCallback((callback: () => void) => {
    callbackRef.current = callback;
  }, []);

  // Handle beforeunload event (page close, refresh, navigate away)
  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (callbackRef.current) {
        callbackRef.current();
      }

      if (showConfirmation) {
        event.preventDefault();
        // Custom message (may be ignored by modern browsers)
        event.returnValue = confirmationMessage || '';
        return confirmationMessage || '';
      }
      return undefined;
    },
    [showConfirmation, confirmationMessage],
  );

  // Handle visibility change (tab switch)
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      setIsPageLeft(true);
      if (callbackRef.current) {
        callbackRef.current();
      }
    } else if (document.visibilityState === 'visible') {
      setIsPageLeft(false);
    }
  }, []);

  useEffect(() => {
    // Skip in non-browser environments to support SSR
    if (typeof window === 'undefined') return undefined;

    // Add beforeunload event for page close/refresh
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Add visibilitychange for tab switching
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleBeforeUnload, handleVisibilityChange]);

  return { isPageLeft, onPageLeave };
}
