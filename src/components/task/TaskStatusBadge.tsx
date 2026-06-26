import { Badge } from '@/components/ui/badge';
import type { TaskStatus } from '@/types/task';

const STATUS_LABELS: Record<TaskStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const variant = status === 'DONE' ? 'success' : status === 'IN_PROGRESS' ? 'warning' : 'outline';

  return <Badge variant={variant}>{STATUS_LABELS[status]}</Badge>;
}
