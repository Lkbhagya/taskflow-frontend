import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Clock,
  Pencil,
  Trash2,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatTaskDate } from '@/components/task/TaskBadges';
import { TaskPriorityBadge } from '@/components/task/TaskPriorityBadge';
import { TaskStatusBadge } from '@/components/task/TaskStatusBadge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';
import type { Task } from '@/types/task';

export function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, deleteTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTask = async () => {
    if (!id) {
      setError('Task not found.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getTaskById(id);
      setTask(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load task.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTask();
  }, [id, getTaskById]);

  const toast = useToast();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async () => {
    if (!task) {
      return;
    }

    setConfirmDeleteOpen(false);
    setIsDeleting(true);

    try {
      await deleteTask(task.id);
      toast.addToast({ title: 'Task deleted successfully', variant: 'success' });
      navigate('/tasks');
    } catch (err) {
      toast.addToast({
        title: 'Deletion failed',
        description: err instanceof Error ? err.message : 'Failed to delete task.',
        variant: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
        Loading task details...
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm font-medium">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {error ?? 'Task not found.'}
          </p>
          <Button variant="outline" onClick={loadTask}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link
        to="/tasks"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Tasks
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <h1 className="text-3xl font-bold tracking-normal text-foreground">{task.title}</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to={`/tasks/${task.id}/edit`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit Task
            </Button>
          </Link>
          <Button variant="destructive" isLoading={isDeleting} onClick={() => setConfirmDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Task
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Task Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{task.description}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Status & Priority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailRow label="Priority">
              <TaskPriorityBadge priority={task.priority} />
            </DetailRow>
            <DetailRow label="Status">
              <TaskStatusBadge status={task.status} />
            </DetailRow>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={UserRound} label="Assigned User" value={task.assignedTo} />
            <InfoItem icon={UserRound} label="Created By" value={task.createdBy} />
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Dates</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <InfoItem icon={CalendarDays} label="Due Date" value={formatTaskDate(task.dueDate)} />
            <InfoItem icon={Clock} label="Created Date" value={formatTaskDate(task.createdAt)} />
          </CardContent>
        </Card>
      </div>
      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Confirm delete"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 font-semibold text-foreground">{value}</p>
    </div>
  );
}
