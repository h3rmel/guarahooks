'use client';

import { useCallback, useState } from 'react';

import useEyeDropper from 'use-eye-dropper';

type UseColorPickerReturn = {
  color: string;
  error: Error | null;
  isSupported: () => boolean;
  pickColor: () => void;
};

export function useColorPicker(): UseColorPickerReturn {
  const { open, close, isSupported } = useEyeDropper();
  const [color, setColor] = useState('#fff');
  const [error, setError] = useState<Error | null>(null);

  const pickColor = useCallback(() => {
    const openPicker = async () => {
      try {
        const pickedColor = await open();
        setColor(pickedColor.sRGBHex);
        setError(null);
      } catch (e: any) {
        console.log(e);
        if (!e.canceled) setError(e);
      }
    };
    openPicker();
  }, [open]);

  return {
    color,
    error,
    isSupported,
    pickColor,
  };
}
