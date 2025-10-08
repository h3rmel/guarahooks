'use client';

import { useCallback, useState } from 'react';

export type ConfirmationStatus =
  | 'idle'
  | 'confirming'
  | 'confirmed'
  | 'cancelled';

interface UseConfirmReturn {
  status: ConfirmationStatus;
  confirm: () => void;
  cancel: () => void;
  reset: () => void;
}

export function useConfirm(): UseConfirmReturn {
  const [status, setStatus] = useState<ConfirmationStatus>('idle');

  const confirm = useCallback(() => {
    setStatus('confirmed');
  }, []);

  const cancel = useCallback(() => {
    setStatus('cancelled');
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
  }, []);

  return {
    status,
    confirm,
    cancel,
    reset,
  };
}
