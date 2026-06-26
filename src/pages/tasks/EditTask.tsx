import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '@/components/task/TaskForm';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/hooks/useAuth';
import type { Task, TaskPayload } from '@/types/task';

export function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Task not found.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    void getTaskById(id)
      .then(setTask)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load task.'),
      )
      .finally(() => setIsLoading(false));
  }, [getTaskById, id]);

  const { hasRole } = useAuth();
  const toast = useToast();

  const handleSubmit = async (values: TaskPayload) => {
    if (!task) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateTask(task.id, values);
      toast.addToast({ title: 'Task updated successfully', variant: 'success' });
      navigate(`/tasks/${task.id}`);
    } catch (err) {
      toast.addToast({
        title: 'Update failed',
        description: err instanceof Error ? err.message : 'Unable to update task.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
        Loading task...
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error ?? 'Task not found.'}
        </p>
        <Link to="/tasks" className="mt-4 inline-flex">
          <Button variant="outline">Back to Tasks</Button>
        </Link>
      </div>
    );
  }

  const initialValues: TaskPayload = {
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    assignedToId: task.assignedToId ?? undefined,
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link
        to={`/tasks/${task.id}`}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Task
      </Link>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-normal text-foreground">Edit Task</h1>
        <p className="text-sm text-muted-foreground">
          Update task details, priority, status, and due date.
        </p>
      </div>

      <TaskForm
        initialValues={initialValues}
        title="Edit Task"
        submitLabel="Save Changes"
        cancelHref={`/tasks/${task.id}`}
        isSubmitting={isSubmitting}
        showAssignedToField={hasRole('ADMIN')}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
