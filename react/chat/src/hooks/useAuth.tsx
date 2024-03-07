import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomName, setRoomName] = useState<string>('');

  const login = useCallback((roomName: string) => {
    localStorage.setItem('room', roomName);
    setIsLoggedIn(true);
    setRoomName(roomName);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('room');
    setIsLoggedIn(false);
    setRoomName('');
  }, []);

  useEffect(() => {
    const room = localStorage.getItem('room');
    if (room != null) {
      setIsLoggedIn(true);
      setRoomName(room);
    }
    return () => {
      logout();
    };
  }, [logout]);

  return { isLoggedIn, roomName, login, logout };
};
