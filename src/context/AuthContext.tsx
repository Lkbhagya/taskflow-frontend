import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '@/services/authService';
import type {
  AuthContextValue,
  LoginCredentials,
  RegisterCredentials,
  User,
  UserRole,
} from '@/types/auth';
import { clearAuthStorage, tokenStorage, userStorage } from '@/utils/tokenStorage';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = tokenStorage.getToken();
    const storedUser = userStorage.getUser<User>();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const persistSession = useCallback(
    (response: { token: string; user: User }, rememberMe = false) => {
      tokenStorage.setToken(response.token, rememberMe);
      userStorage.setUser(response.user, rememberMe);
      setToken(response.token);
      setUser(response.user);
    },
    [],
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);

      try {
        const response = await authService.login(credentials);
        persistSession(response, credentials.rememberMe);
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setIsLoading(true);

      try {
        const response = await authService.register(credentials);
        persistSession(response, true);
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!user) {
        return false;
      }

      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      return allowedRoles.includes(user.role);
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      register,
      logout,
      hasRole,
    }),
    [user, token, isLoading, login, register, logout, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}
