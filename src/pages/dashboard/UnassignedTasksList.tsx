import { CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { Task } from '@/types/task';

interface UnassignedTask {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface UnassignedTasksListProps {
  tasks: UnassignedTask[];
}

export function UnassignedTasksList({ tasks }: UnassignedTasksListProps) {
  return (
    <div className="space-y-1">
      {tasks.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted p-4 text-sm text-muted-foreground">
          No unassigned tasks found.
        </div>
      ) : null}

      {tasks.map((task, index) => (
        <div key={task.id}>
          <div className="flex flex-col gap-2 rounded-md px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-foreground">{task.title}</p>
              <p className="text-sm text-muted-foreground">{task.priority} · {task.status}</p>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Due{' '}
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
          {index < tasks.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
