import { useCallback, useEffect, useState } from 'react';
import { taskService } from '@/services/taskService';
import type { Task, TaskFilters, TaskPayload } from '@/types/task';
import { useAuth } from '@/hooks/useAuth';

const DEFAULT_FILTERS: TaskFilters = {
  search: '',
  status: 'ALL',
  priority: 'ALL',
};

export function useTasks(initialFilters: TaskFilters = DEFAULT_FILTERS) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await taskService.getTasks(user, filters);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const getTaskById = useCallback(
    (id: string) => taskService.getTaskById(user, id),
    [user],
  );

  const createTask = useCallback(
    async (payload: TaskPayload) => {
      const task = await taskService.createTask(user, payload);
      await fetchTasks();
      return task;
    },
    [fetchTasks, user],
  );

  const updateTask = useCallback(
    async (id: string, payload: TaskPayload) => {
      const task = await taskService.updateTask(user, id, payload);
      await fetchTasks();
      return task;
    },
    [fetchTasks, user],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await taskService.deleteTask(user, id);
      await fetchTasks();
    },
    [fetchTasks, user],
  );

  return {
    tasks,
    filters,
    setFilters,
    isLoading,
    error,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
