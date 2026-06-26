import { TaskPriorityBadge } from '@/components/task/TaskPriorityBadge';
import { TaskStatusBadge } from '@/components/task/TaskStatusBadge';
import type { TaskPriority, TaskStatus } from '@/types/task';

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <TaskPriorityBadge priority={priority} />;
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <TaskStatusBadge status={status} />;
}

export function formatTaskDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
