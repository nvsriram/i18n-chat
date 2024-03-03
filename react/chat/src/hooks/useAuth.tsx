import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    const room = localStorage.getItem('room');
    if (room != null) {
      setIsLoggedIn(true);
      setRoomName(room);
    }
  }, []);

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

  return { isLoggedIn, roomName, login, logout };
};
