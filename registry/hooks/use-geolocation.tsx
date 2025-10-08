'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface GeolocationState {
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  isLoading: boolean;
  clearWatch: () => void;
}

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const watchId = useRef<number | null>(null);

  const clearWatch = useCallback(() => {
    if (watchId.current !== null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError({
        code: 0,
        message: 'Geolocation API not supported',
      } as GeolocationPositionError);
      setIsLoading(false);
      return;
    }

    const onSuccess = (pos: GeolocationPosition) => {
      setPosition(pos);
      setError(null);
      setIsLoading(false);
    };

    const onError = (err: GeolocationPositionError) => {
      setError(err);
      setPosition(null);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    const id = navigator.geolocation.watchPosition(onSuccess, onError, options);
    watchId.current = id;

    return () => {
      clearWatch();
    };
  }, [options, clearWatch]);

  return { position, error, isLoading, clearWatch };
}
