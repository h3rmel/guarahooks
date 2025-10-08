'use client';

import { useCallback, useRef, useState } from 'react';

interface DisclosureCallbacks {
  onOpen?: () => void;
  onClose?: () => void;
}

interface DisclosureState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useDisclosure(
  initialState = false,
  callbacks?: DisclosureCallbacks,
): [boolean, Omit<DisclosureState, 'isOpen'>] {
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        callbacksRef.current?.onOpen?.();
        return true;
      }
      return prev;
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        callbacksRef.current?.onClose?.();
        return false;
      }
      return prev;
    });
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        callbacksRef.current?.onClose?.();
        return false;
      }
      callbacksRef.current?.onOpen?.();
      return true;
    });
  }, []);

  return [isOpen, { open, close, toggle }];
}
