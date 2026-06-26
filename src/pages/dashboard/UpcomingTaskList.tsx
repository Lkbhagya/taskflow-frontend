import { CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
}

interface UpcomingTasksListProps {
  tasks: UpcomingTask[];
}

export function UpcomingTasksList({ tasks }: UpcomingTasksListProps) {
  return (
    <div className="space-y-1">
      {tasks.map((task, index) => (
        <div key={task.id}>
          <div className="flex flex-col gap-2 rounded-md px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-foreground">{task.title}</p>

            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Due{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}            </p>
          </div>
          {index < tasks.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
