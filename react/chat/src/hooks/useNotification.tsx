import { useCallback, useEffect, useState } from 'react';

import { INACTIVE_DURATION } from '@/constants';
import { parseDate } from '@/helpers/ParseDate';
import { IRoomEvent, MSG_TYPES } from '@/types';

interface INotification {
  events: IRoomEvent[];
  userID: number;
}

export const useNotification = ({ events, userID }: INotification) => {
  const [isInactive, setIsInactive] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState<NodeJS.Timeout>();
  const [notification, setNotification] = useState<Notification | null>(null);

  const latestEvent = events.length > 0 ? events[events.length - 1] : null;

  if (latestEvent) {
    console.log(parseDate(latestEvent.timestamp));
  }

  const handleInactive = useCallback(
    (isInactive: boolean) => {
      clearTimeout(inactiveTimeout);
      setIsInactive(isInactive);
      if (isInactive) {
        setInactiveTimeout(undefined);
      } else {
        const timeout = setTimeout(
          () => setIsInactive(true),
          INACTIVE_DURATION,
        );
        setInactiveTimeout(timeout);
      }
    },
    [inactiveTimeout],
  );

  const handleVisibility = useCallback(() => {
    if (document.visibilityState === 'visible') {
      if (notification != null) {
        notification.close();
      }
      handleInactive(false);
    } else {
      handleInactive(true);
    }
  }, [notification, handleInactive]);

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
    if (!isInactive) {
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
  }, [latestEvent, userID, isInactive]);

  useEffect(() => {
    const handleInactiveFalse = () => handleInactive(false);
    document.onmousemove = handleInactiveFalse;
    document.onmousedown = handleInactiveFalse;
    document.ontouchstart = handleInactiveFalse;
    document.onclick = handleInactiveFalse;
    document.onkeydown = handleInactiveFalse;
    document.addEventListener('scroll', handleInactiveFalse, true);
    document.addEventListener('visibilitychange', handleVisibility);
    handleNotification();

    return () => {
      document.removeEventListener('scroll', handleInactiveFalse, true);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [handleVisibility, handleNotification, handleInactive]);
};
