import { X } from 'lucide-react';
import type { TaskFilters, TaskPriority, TaskStatus } from '@/types/task';

interface TaskFiltersBarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

const STATUS_OPTIONS: Array<{ value: TaskStatus | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

const PRIORITY_OPTIONS: Array<{ value: TaskPriority | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All Priorities' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

export function TaskFiltersBar({ filters, onChange }: TaskFiltersBarProps) {
  const clearSearch = () => onChange({ ...filters, search: '' });
  const clearStatus = () => onChange({ ...filters, status: 'ALL' });
  const clearPriority = () => onChange({ ...filters, priority: 'ALL' });

  return (
    <div className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_180px_180px]">
      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Search</span>
        <div className="relative">
          <input
            className="h-10 w-full rounded-md border border-border bg-white px-3 pr-10 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Search by title, description, or assignee"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
          />
          {filters.search.trim() ? (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-500 transition hover:bg-slate-200 hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Status
        </span>

        <div className="relative">
          <select
            className="
        h-10
        w-full
        rounded-md
        border
        border-border
        bg-white
        px-3
        pr-16
        text-sm
        text-foreground
        outline-none
        transition
        focus:border-primary
        focus:ring-2
        focus:ring-primary/20
      "
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status: event.target.value as TaskStatus | 'ALL',
              })
            }
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {filters.status !== 'ALL' && (
            <button
              type="button"
              onClick={clearStatus}
              className="
          absolute
          right-8
          top-1/2
          flex
          h-5
          w-5
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-slate-100
          text-slate-500
          transition
          hover:bg-slate-200
          hover:text-foreground
        "
              aria-label="Clear status filter"
            >
              <X
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Priority
        </span>

        <div className="relative">
          <select
            className="
        h-10
        w-full
        rounded-md
        border
        border-border
        bg-white
        px-3
        pr-16
        text-sm
        text-foreground
        outline-none
        transition
        focus:border-primary
        focus:ring-2
        focus:ring-primary/20
      "
            value={filters.priority}
            onChange={(event) =>
              onChange({
                ...filters,
                priority: event.target.value as TaskPriority | 'ALL',
              })
            }
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {filters.priority !== 'ALL' && (
            <button
              type="button"
              onClick={clearPriority}
              className="
          absolute
          right-8
          top-1/2
          flex
          h-5
          w-5
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-slate-100
          text-slate-500
          transition
          hover:bg-slate-200
          hover:text-foreground
        "
              aria-label="Clear priority filter"
            >
              <X
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
