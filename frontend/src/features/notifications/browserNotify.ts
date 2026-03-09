export function showBrowserNotification(title: string, body: string): void {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }
}
