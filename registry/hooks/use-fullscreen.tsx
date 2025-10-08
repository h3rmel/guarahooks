'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Type for the ref that can be passed to the hook
export type FullscreenRef = React.RefObject<HTMLElement> | null;

// Vendor-prefixed Fullscreen API support
interface VendorDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface VendorElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

// Utility functions for cross-browser Fullscreen API
function getFullscreenElement(): Element | null {
  const doc = document as VendorDocument;
  return (
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}

function requestFullscreen(element: HTMLElement) {
  const el = element as VendorElement;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
  if (el.msRequestFullscreen) return el.msRequestFullscreen();
}

function exitFullscreen() {
  const doc = document as VendorDocument;
  if (doc.exitFullscreen) return doc.exitFullscreen();
  if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen();
  if (doc.mozCancelFullScreen) return doc.mozCancelFullScreen();
  if (doc.msExitFullscreen) return doc.msExitFullscreen();
}

function addFullscreenListener(cb: () => void) {
  document.addEventListener('fullscreenchange', cb);
  document.addEventListener('webkitfullscreenchange', cb);
  document.addEventListener('mozfullscreenchange', cb);
  document.addEventListener('MSFullscreenChange', cb);
}

function removeFullscreenListener(cb: () => void) {
  document.removeEventListener('fullscreenchange', cb);
  document.removeEventListener('webkitfullscreenchange', cb);
  document.removeEventListener('mozfullscreenchange', cb);
  document.removeEventListener('MSFullscreenChange', cb);
}

export function useFullscreen(
  ref: FullscreenRef = null,
): [boolean, () => void, () => void] {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const refCached = useRef(ref);

  useEffect(() => {
    refCached.current = ref;
  }, [ref]);

  const handleChange = useCallback(() => {
    const current = refCached.current?.current ?? document.documentElement;
    setIsFullscreen(getFullscreenElement() === current);
  }, []);

  useEffect(() => {
    addFullscreenListener(handleChange);
    handleChange(); // Initial check
    return () => {
      removeFullscreenListener(handleChange);
    };
  }, [handleChange]);

  const enter = useCallback(() => {
    const el = refCached.current?.current ?? document.documentElement;
    if (el && getFullscreenElement() !== el) {
      requestFullscreen(el);
    }
  }, []);

  const exit = useCallback(() => {
    if (getFullscreenElement()) {
      exitFullscreen();
    }
  }, []);

  return [isFullscreen, enter, exit];
}
