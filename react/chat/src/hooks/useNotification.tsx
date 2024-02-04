import { IRoomEvent, MSG_TYPES } from '@/types';
import { useCallback, useEffect, useState } from 'react';

interface INotification {
  events: IRoomEvent[];
  userID: number;
}

export const useNotification = ({ events, userID }: INotification) => {
  const [lastActive, setLastActive] = useState<number | null>(null);
  const [isInactive, setIsInactive] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const latestEvent = events.length > 0 ? events[events.length - 1] : null;

  const handleVisibility = useCallback(() => {
    if (document.visibilityState === 'visible') {
      if (notification != null) {
        notification.close();
      }
      setLastActive(Date.now());
      setIsInactive(false);
    } else {
      setIsInactive(true);
    }
  }, [notification]);

  const handleIdle = useCallback(() => {
    setLastActive(Date.now());
  }, []);

  const handlePermissions = async () => {
    switch (Notification.permission) {
      case 'denied':
        return false;
      case 'granted':
        return true;
      case 'default': {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      default:
        return false;
    }
  };

  const handleNotification = useCallback(async () => {
    if (!latestEvent) {
      return;
    }
    const permission = await handlePermissions();
    if (!permission) {
      return;
    }
    if (
      latestEvent.userID !== userID ||
      latestEvent.msg_type !== MSG_TYPES.MESSAGE
    ) {
      return;
    }
    const notification = new Notification('New Message', {
      body: latestEvent.message,
      icon: 'Logo',
    });
    setNotification(notification);
  }, [latestEvent, userID]);

  useEffect(() => {
    document.onmousemove = handleIdle;
    document.onmousedown = handleIdle;
    document.ontouchstart = handleIdle;
    document.onclick = handleIdle;
    document.onkeydown = handleIdle;
    document.addEventListener('scroll', handleIdle, true);
    document.addEventListener('visibilitychange', handleVisibility);
    handleNotification();

    return () => {
      document.removeEventListener('scroll', handleIdle, true);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [handleVisibility, handleNotification, handleIdle]);
};
