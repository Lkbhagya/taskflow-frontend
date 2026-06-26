import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Link, useNavigate } from 'react-router-dom';
import { TaskForm } from '@/components/task/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import type { TaskPayload } from '@/types/task';

const BASE_VALUES: TaskPayload = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'OPEN',
  dueDate: '',
};

export function CreateTask() {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const { user, hasRole } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: TaskPayload = {
    ...BASE_VALUES,
    assignedToId: hasRole('ADMIN') ? undefined : user?.id,
  };

  const toast = useToast();

  const handleSubmit = async (values: TaskPayload) => {
    setIsSubmitting(true);

    try {
      await createTask(values);
      toast.addToast({ title: 'Task added successfully', variant: 'success' });
      navigate('/tasks');
    } catch (err) {
      toast.addToast({
        title: 'Task creation failed',
        description: err instanceof Error ? err.message : 'Unable to create task.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link
        to="/tasks"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Tasks
      </Link>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-normal text-foreground">Create New Task</h1>
        <p className="text-sm text-muted-foreground">
          Add a task with priority, status, and a clear due date.
        </p>
      </div>

      <TaskForm
        initialValues={initialValues}
        title="Create New Task"
        submitLabel="Create Task"
        cancelHref="/tasks"
        isSubmitting={isSubmitting}
        showAssignedToField={hasRole('ADMIN')}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
