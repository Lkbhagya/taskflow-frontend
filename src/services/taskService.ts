import type { User } from '@/types/auth';
import type { Task, TaskFilters, TaskPayload, TaskStats } from '@/types/task';
import { api } from '@/services/api';
import { SEED_TASKS, MOCK_USERS } from '@/utils/mockData';
import { USE_MOCK_API, delay } from '@/utils/config';

const STORAGE_KEY = 'taskflow_tasks';

function readTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    writeTasks(SEED_TASKS);
    return [...SEED_TASKS];
  }

  try {
    const parsed = JSON.parse(stored) as Task[];
    return parsed.map(normalizeTask);
  } catch {
    writeTasks(SEED_TASKS);
    return [...SEED_TASKS];
  }
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function normalizeTask(task: Task): Task {
  const legacyTask = task as Omit<Task, 'createdBy' | 'assignedTo'> & {
    createdBy?: unknown;
    assignedTo?: unknown;
  };

  return {
    ...task,
    id: String(task.id),
    createdBy: normalizePersonName(legacyTask.createdBy, 'Unknown'),
    assignedTo: normalizePersonName(legacyTask.assignedTo, 'Unassigned'),
  };
}

function normalizePersonName(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    return value;
  }

  if (
    value &&
    typeof value === 'object' &&
    'name' in value &&
    typeof value.name === 'string'
  ) {
    return value.name;
  }

  return fallback;
}

function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
  const query = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.assignedTo.toLowerCase().includes(query);

    const matchesStatus = filters.status === 'ALL' || task.status === filters.status;
    const matchesPriority =
      filters.priority === 'ALL' || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

function computeStats(tasks: Task[]): TaskStats {
  return {
    total: tasks.length,
    open: tasks.filter((task) => task.status === 'OPEN').length,
    inProgress: tasks.filter((task) => task.status === 'IN_PROGRESS').length,
    completed: tasks.filter((task) => task.status === 'DONE').length,
  };
}

export const taskService = {
  async getTasks(
    _user?: User | null,
    filters: TaskFilters = { search: '', status: 'ALL', priority: 'ALL' },
  ): Promise<Task[]> {
    if (USE_MOCK_API) {
      await delay(250);
      return applyFilters(readTasks(), filters);
    }

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.status !== 'ALL') params.set('status', filters.status);
    if (filters.priority !== 'ALL') params.set('priority', filters.priority);

    const query = params.toString();
    return api.request<Task[]>(`/tasks${query ? `?${query}` : ''}`, { auth: true });
  },

  async getTaskById(_user: User | null | undefined, id: string): Promise<Task> {
    if (USE_MOCK_API) {
      await delay(200);
      const task = readTasks().find((entry) => entry.id === id);

      if (!task) {
        throw new Error('Task not found.');
      }

      return task;
    }

    return api.request<Task>(`/tasks/${id}`, { auth: true });
  },

  async createTask(user: User | null | undefined, payload: TaskPayload): Promise<Task> {
    if (USE_MOCK_API) {
      await delay(350);
      const tasks = readTasks();
      const nextId =
        tasks.length > 0
          ? String(Math.max(...tasks.map((task) => Number(task.id) || 0)) + 1)
          : '1';

      const assignedUser = payload.assignedToId
        ? MOCK_USERS.find((entry) => entry.id === payload.assignedToId)
        : undefined;

      const newTask: Task = {
        id: nextId,
        title: payload.title.trim(),
        description: payload.description.trim(),
        priority: payload.priority,
        status: payload.status,
        dueDate: payload.dueDate,
        assignedTo: assignedUser?.name || 'Unassigned',
        assignedToId: payload.assignedToId ?? null,
        createdBy: user?.name || 'Current User',
        createdAt: new Date().toISOString(),
      };

      writeTasks([newTask, ...tasks]);
      return newTask;
    }

    return api.request<Task>('/tasks', { method: 'POST', body: payload, auth: true });
  },

  async updateTask(
    _user: User | null | undefined,
    id: string,
    payload: TaskPayload,
  ): Promise<Task> {
    if (USE_MOCK_API) {
      await delay(350);
      const tasks = readTasks();
      const index = tasks.findIndex((task) => task.id === id);

      if (index === -1) {
        throw new Error('Task not found.');
      }

      const assignedUser = payload.assignedToId
        ? MOCK_USERS.find((entry) => entry.id === payload.assignedToId)
        : undefined;

      const updated: Task = {
        ...tasks[index],
        title: payload.title.trim(),
        description: payload.description.trim(),
        priority: payload.priority,
        status: payload.status,
        dueDate: payload.dueDate,
        assignedTo: assignedUser?.name || tasks[index].assignedTo || 'Unassigned',
        assignedToId: payload.assignedToId ?? tasks[index].assignedToId ?? null,
      };

      tasks[index] = updated;
      writeTasks(tasks);
      return updated;
    }

    return api.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: payload,
      auth: true,
    });
  },

  async deleteTask(_user: User | null | undefined, id: string): Promise<void> {
    if (USE_MOCK_API) {
      await delay(250);
      const tasks = readTasks();
      const nextTasks = tasks.filter((task) => task.id !== id);

      if (nextTasks.length === tasks.length) {
        throw new Error('Task not found.');
      }

      writeTasks(nextTasks);
      return;
    }

    await api.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  },

  async getStats(user?: User | null): Promise<TaskStats> {
    if (USE_MOCK_API) {
      await delay(200);
      return computeStats(await this.getTasks(user));
    }

    return api.request<TaskStats>('/tasks/stats', { auth: true });
  },
};
