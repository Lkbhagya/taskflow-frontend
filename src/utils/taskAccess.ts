import type { User } from '@/types/auth';
import type { Task } from '@/types/task';

export function canAccessTask(task: Task, user: User): boolean {
  if (user.role === 'ADMIN') {
    return true;
  }

  return task.createdBy === user.name || task.assignedTo === user.name;
}

export function filterTasksForUser(tasks: Task[], user: User): Task[] {
  if (user.role === 'ADMIN') {
    return tasks;
  }

  return tasks.filter((task) => canAccessTask(task, user));
}
