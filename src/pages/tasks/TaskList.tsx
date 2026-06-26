import { AlertCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskEmptyState } from '@/components/task/TaskEmptyState';
import { TaskFiltersBar } from '@/components/task/TaskFilters';
import { TaskTable } from '@/components/task/TaskTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/Toast';
import { useTasks } from '@/hooks/useTasks';

export function TaskList() {
  const { tasks, filters, setFilters, isLoading, error, refetch, deleteTask } = useTasks();
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const toast = useToast();

  const openDeleteConfirm = (id: string) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) {
      return;
    }

    setIsDeletingId(confirmDeleteId);
    setConfirmDeleteId(null);

    try {
      await deleteTask(confirmDeleteId);
      toast.addToast({ title: 'Task deleted successfully', variant: 'success' });
    } catch (err) {
      toast.addToast({
        title: 'Task deletion failed',
        description: err instanceof Error ? err.message : 'Failed to delete task.',
        variant: 'error',
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-normal text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your tasks efficiently.
          </p>
        </div>

        <Link to="/tasks/create">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create Task
          </Button>
        </Link>
      </header>

      <TaskFiltersBar filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
          <div className="state state--loading">
            <span className="state__spinner" aria-hidden="true" />
            <span className="state__message">Loading tasks...</span>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-5 text-destructive">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {error}
            </p>
            <Button variant="outline" onClick={refetch}>
              Retry
            </Button>
          </div>
        </div>
      ) : null}

      {!isLoading && !error && tasks.length === 0 ? <TaskEmptyState /> : null}

      {!isLoading && !error && tasks.length > 0 ? (
        <>
          <div className="grid gap-4 md:hidden">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={openDeleteConfirm}
                isDeleting={isDeletingId === task.id}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <TaskTable
              tasks={tasks}
              onDelete={openDeleteConfirm}
              isDeletingId={isDeletingId}
            />
          </div>
        </>
      ) : null}

      <ConfirmDialog
        open={Boolean(confirmDeleteId)}
        title="Confirm delete"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onCancel={cancelDelete}
        onConfirm={handleDelete}
      />
    </section>
  );
}
