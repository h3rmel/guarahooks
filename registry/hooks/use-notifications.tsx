'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type NotificationPermission = 'default' | 'granted' | 'denied';

type NotificationOptions<TData = void> = {
  body?: string;
  icon?: string;
  image?: string;
  badge?: string;
  tag?: string;
  data?: TData;
  requireInteraction?: boolean;
  silent?: boolean;
  sound?: string;
  vibrate?: number | number[];
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  renotify?: boolean;
  sticky?: boolean;
  timestamp?: number;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
};

type UseNotificationsReturn<TData = void> = {
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (
    title: string,
    options?: NotificationOptions<TData>,
  ) => void;
  isSupported: boolean;
  isSecureContext: boolean;
  supportsActions: boolean;
  supportsBadge: boolean;
  supportsImage: boolean;
  supportsVibrate: boolean;
  supportsSound: boolean;
};

// Cache to store the result of the support check
const supportCache = new Map<string, boolean>();

type NotificationFeature = 'actions' | 'badge' | 'image' | 'vibrate' | 'sound';

function checkFeatureSupport(feature: NotificationFeature): boolean {
  if (supportCache.has(feature)) {
    return supportCache.get(feature)!;
  }

  const isSupported = feature in Notification.prototype;
  supportCache.set(feature, isSupported);
  return isSupported;
}

export function useNotifications<
  TData = void,
>(): UseNotificationsReturn<TData> {
  const [permission, setPermission] =
    useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [isSecureContext, setIsSecureContext] = useState(false);
  const [supportsActions, setSupportsActions] = useState(false);
  const [supportsBadge, setSupportsBadge] = useState(false);
  const [supportsImage, setSupportsImage] = useState(false);
  const [supportsVibrate, setSupportsVibrate] = useState(false);
  const [supportsSound, setSupportsSound] = useState(false);

  // Using useRef to avoid recreating objects on each render
  const notificationRef = useRef<Notification | null>(null);

  useEffect(() => {
    const checkSupport = () => {
      const hasNotification = 'Notification' in window;
      const isSecure = window.isSecureContext;

      setIsSupported(hasNotification);
      setIsSecureContext(isSecure);

      if (hasNotification) {
        setPermission(Notification.permission);
        setSupportsActions(checkFeatureSupport('actions'));
        setSupportsBadge(checkFeatureSupport('badge'));
        setSupportsImage(checkFeatureSupport('image'));
        setSupportsVibrate(checkFeatureSupport('vibrate'));
        setSupportsSound(checkFeatureSupport('sound'));
      }
    };

    checkSupport();
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      throw new Error('Notifications are not supported in this browser');
    }

    if (!isSecureContext) {
      throw new Error('Notifications require a secure context (HTTPS)');
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  }, [isSupported, isSecureContext]);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions<TData>) => {
      if (!isSupported) {
        // Fallback for browsers that do not support notifications
        console.warn(
          'Notifications not supported. Consider using a fallback UI notification.',
        );
        return;
      }

      if (!isSecureContext) {
        console.warn(
          'Notifications require HTTPS. Consider using a fallback UI notification.',
        );
        return;
      }

      if (permission !== 'granted') {
        console.warn(
          'Notification permission not granted. Consider using a fallback UI notification.',
        );
        return;
      }

      try {
        // Clear previous notification if it exists
        if (notificationRef.current) {
          notificationRef.current.close();
        }

        // Create new notification
        notificationRef.current = new Notification(title, {
          ...options,
          // Remove unsupported options
          ...(!supportsActions && { actions: undefined }),
          ...(!supportsBadge && { badge: undefined }),
          ...(!supportsImage && { image: undefined }),
          ...(!supportsVibrate && { vibrate: undefined }),
          ...(!supportsSound && { sound: undefined }),
        });

        // Clear reference when the notification is closed
        notificationRef.current.onclose = () => {
          notificationRef.current = null;
        };
      } catch (error) {
        console.error('Error showing notification:', error);
        // Fallback for UI notification in case of error
        console.warn(
          'Failed to show system notification. Consider using a fallback UI notification.',
        );
      }
    },
    [
      isSupported,
      isSecureContext,
      permission,
      supportsActions,
      supportsBadge,
      supportsImage,
      supportsVibrate,
      supportsSound,
    ],
  );

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported,
    isSecureContext,
    supportsActions,
    supportsBadge,
    supportsImage,
    supportsVibrate,
    supportsSound,
  };
}
