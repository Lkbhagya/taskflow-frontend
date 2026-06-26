const ACCESS_TOKEN_KEY = 'taskflow_access_token';
const USER_KEY = 'taskflow_user';

const getStorage = (persistent: boolean): Storage =>
  persistent ? localStorage : sessionStorage;

export const tokenStorage = {
  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setToken(token: string, rememberMe = false): void {
    tokenStorage.clearToken();
    getStorage(rememberMe).setItem(ACCESS_TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export const userStorage = {
  getUser<T>(): T | null {
    const raw =
      localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T, rememberMe = false): void {
    userStorage.clearUser();
    getStorage(rememberMe).setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser(): void {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};

export const clearAuthStorage = (): void => {
  tokenStorage.clearToken();
  userStorage.clearUser();
};
