import type { AppUser } from '@/types/user';
import { api } from '@/services/api';
import { USE_MOCK_API, delay } from '@/utils/config';
import { MOCK_USERS } from '@/utils/mockData';

function normalizeUser(user: AppUser): AppUser {
  return { ...user, id: Number(user.id) };
}

export const userService = {
  async getUsers(): Promise<AppUser[]> {
    if (USE_MOCK_API) {
      await delay(300);
      return MOCK_USERS.map(normalizeUser);
    }

    const response = await api.request<AppUser[]>('/users', { auth: true });
    return response.map(normalizeUser);
  },

  async getUserById(id: string): Promise<AppUser> {
    if (USE_MOCK_API) {
      await delay(200);
      const user = MOCK_USERS.find((u) => String(u.id) === String(id));
      if (!user) throw new Error('User not found.');
      return normalizeUser(user);
    }

    return normalizeUser(await api.request<AppUser>(`/users/${id}`, { auth: true }));
  },

  async updateUserRole(id: string, role: 'ADMIN' | 'USER'): Promise<AppUser> {
    if (USE_MOCK_API) {
      await delay(300);
      const user = MOCK_USERS.find((entry) => String(entry.id) === String(id));
      if (!user) throw new Error('User not found.');
      user.role = role;
      return normalizeUser(user);
    }

    return normalizeUser(
      await api.request<AppUser>(`/users/${id}/role`, {
        method: 'PUT',
        body: { role },
        auth: true,
      }),
    );
  },
};
