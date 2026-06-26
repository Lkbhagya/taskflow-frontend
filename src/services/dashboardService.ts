import type { Task } from '@/types/task';
import type { AppUser } from '@/types/user';
import { api } from '@/services/api';

export interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  myTasks: {
    assigned: number;
    completed: number;
    pending: number;
  };
  recentTasks: Task[];
  unassignedTasks: Task[];
  users: AppUser[];
}

export const dashboardService = {
  getDashboard: () => api.request<DashboardResponse>('/dashboard', { auth: true }),
};
