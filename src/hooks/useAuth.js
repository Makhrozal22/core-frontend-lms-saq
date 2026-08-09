import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    logout,
  };
};

export default useAuth;
