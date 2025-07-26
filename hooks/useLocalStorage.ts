import type {User} from '../types/user';
import { useState, useEffect } from 'react';

export default function useLocalStorage(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      setStoredValue(value);
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { 
        detail: { key, value } 
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = (user: User) => {
    if (key === 'users') {
      try {
        const currentUsers = storedValue || [];
        const updatedUsers = [...currentUsers, user];
        setStoredValue(updatedUsers);
        window.localStorage.setItem(key, JSON.stringify(updatedUsers));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  if (key === 'users') {
    return [storedValue, setValue, addUser];
  } else {
    return [storedValue, setValue];
  }
}