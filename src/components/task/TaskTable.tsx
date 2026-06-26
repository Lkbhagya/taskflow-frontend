import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TaskPriorityBadge } from '@/components/task/TaskPriorityBadge';
import { TaskStatusBadge } from '@/components/task/TaskStatusBadge';
import { formatTaskDate } from '@/components/task/TaskBadges';
import type { Task } from '@/types/task';

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  isDeletingId?: string | null;
}

export function TaskTable({ tasks, onDelete, isDeletingId }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left">
          <thead className="bg-muted/70">
            <tr className="text-xs font-semibold uppercase text-muted-foreground">
              <th className="px-5 py-4">Task</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Due Date</th>
              <th className="px-5 py-4">Assigned User</th>
              <th className="px-5 py-4">Created Date</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <tr key={task.id} className="transition-colors hover:bg-muted/40">
                <td className="max-w-sm px-5 py-4">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {task.title}
                  </Link>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <TaskPriorityBadge priority={task.priority} />
                </td>
                <td className="px-5 py-4">
                  <TaskStatusBadge status={task.status} />
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {formatTaskDate(task.dueDate)}
                </td>
                <td className="px-5 py-4 text-sm text-foreground">{task.assignedTo}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {formatTaskDate(task.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link to={`/tasks/${task.id}`}>
                      <Button variant="ghost" size="sm" aria-label={`View ${task.title}`}>
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link to={`/tasks/${task.id}/edit`}>
                      <Button variant="ghost" size="sm" aria-label={`Edit ${task.title}`}>
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      isLoading={isDeletingId === task.id}
                      aria-label={`Delete ${task.title}`}
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
