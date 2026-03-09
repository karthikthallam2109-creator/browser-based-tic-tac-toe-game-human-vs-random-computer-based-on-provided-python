import { useState, useEffect } from 'react';

export type NotificationPermissionState = 'default' | 'granted' | 'denied';

export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermissionState>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    // Update permission if it changes
    const checkPermission = () => {
      setPermission(Notification.permission);
    };

    // Check periodically (some browsers don't fire events)
    const interval = setInterval(checkPermission, 1000);

    return () => clearInterval(interval);
  }, []);

  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  };

  return {
    permission,
    requestPermission,
    isGranted: permission === 'granted',
    isDenied: permission === 'denied',
    isDefault: permission === 'default',
  };
}
