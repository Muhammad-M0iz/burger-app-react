import  useLocalStorage  from './useLocalStorage';
export default function useAuth() {
  const [user, setUser] = useLocalStorage('currentUser', null);

  const logout = () => {
    setUser(null);
  };

  return { user, logout };
}