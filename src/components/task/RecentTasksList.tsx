import { Link } from 'react-router-dom';
import { PriorityBadge, StatusBadge, formatTaskDate } from '@/components/task/TaskBadges';
import { Separator } from '@/components/ui/separator';
import type { Task } from '@/types/task';

interface RecentTasksListProps {
  tasks: Task[];
}

export function RecentTasksList({ tasks }: RecentTasksListProps) {
  if (!tasks.length) {
    return <p className="text-sm text-muted-foreground">No recent tasks to display.</p>;
  }

  return (
    <div className="space-y-1">
      {tasks.slice(0, 5).map((task, index) => (
        <div key={task.id}>
          <Link
            to={`/tasks/${task.id}`}
            className="flex flex-col gap-3 rounded-md px-2 py-3 text-foreground transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold">{task.title}</p>
              <p className="text-xs text-muted-foreground">
                Due {formatTaskDate(task.dueDate)} · {task.assignedTo}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </Link>
          {index < Math.min(tasks.length, 5) - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
