import { CalendarDays, Eye, Pencil, Trash2, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatTaskDate } from '@/components/task/TaskBadges';
import type { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function getShortDescription(description: string) {
  return description.length > 120 ? `${description.slice(0, 120).trim()}...` : description;
}

export function TaskCard({ task, onDelete, isDeleting = false }: TaskCardProps) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={`/tasks/${task.id}`}
              className="text-base font-semibold text-foreground hover:text-primary"
            >
              {task.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {getShortDescription(task.description)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="text-sm text-muted-foreground">{task.priority}</span>
            <span className="text-sm text-muted-foreground">{task.status.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Due {formatTaskDate(task.dueDate)}
          </span>
          <span className="inline-flex items-center gap-2">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            {task.assignedTo}
          </span>
          <span>Created {formatTaskDate(task.createdAt)}</span>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Link to={`/tasks/${task.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" aria-hidden="true" />
              View
            </Button>
          </Link>
          <Link to={`/tasks/${task.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            isLoading={isDeleting}
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
