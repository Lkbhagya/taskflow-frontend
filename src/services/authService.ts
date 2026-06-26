import type { LoginCredentials, LoginResponse, RegisterCredentials } from '@/types/auth';
import { api } from '@/services/api';
import { DEMO_PASSWORD, MOCK_USERS } from '@/utils/mockData';
import { USE_MOCK_API, delay } from '@/utils/config';
import type { AppUser } from '@/types/user';

const mockUsers: AppUser[] = [...MOCK_USERS];

function toAuthUser(user: AppUser) {
  return { id: user.id, name: user.name, role: user.role };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (USE_MOCK_API) {
      await delay(600);

      const account = mockUsers.find(
        (user) => user.email.toLowerCase() === credentials.email.trim().toLowerCase(),
      );

      if (!account || credentials.password !== DEMO_PASSWORD) {
        throw new Error('Invalid email or password.');
      }

      return {
        token: `mock-jwt-token-${account.id}`,
        user: toAuthUser(account),
      };
    }

    return api.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    if (USE_MOCK_API) {
      await delay(700);

      const exists = mockUsers.some(
        (user) => user.email.toLowerCase() === credentials.email.trim().toLowerCase(),
      );

      if (exists) {
        throw new Error('An account with this email already exists.');
      }

      const newUser: AppUser = {
        id: mockUsers.length + 1,
        name: credentials.name.trim(),
        email: credentials.email.trim().toLowerCase(),
        role: 'USER',
      };

      mockUsers.push(newUser);

      return {
        token: `mock-jwt-token-${newUser.id}`,
        user: toAuthUser(newUser),
      };
    }

    return api.request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: credentials,
    });
  },

  getMockUsers(): AppUser[] {
    return [...mockUsers];
  },
};
