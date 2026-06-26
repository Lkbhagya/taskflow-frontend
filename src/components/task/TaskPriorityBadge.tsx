import { Badge } from '@/components/ui/badge';
import type { TaskPriority } from '@/types/task';

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const variant =
    priority === 'HIGH' ? 'destructive' : priority === 'MEDIUM' ? 'warning' : 'secondary';

  return <Badge variant={variant}>{PRIORITY_LABELS[priority]}</Badge>;
}
