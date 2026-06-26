import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function TaskEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card p-10 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ClipboardList className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        No tasks found
      </h2>

      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        Create your first task or adjust the filters to find the work you need.
      </p>

      <Link to="/tasks/create" className="mt-6">
        <Button>Create Task</Button>
      </Link>
    </div>
  );
}
