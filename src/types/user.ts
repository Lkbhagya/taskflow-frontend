import type { UserRole } from '@/types/auth';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
