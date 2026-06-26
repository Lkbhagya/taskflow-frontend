import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSelect } from '@/components/user/UserSelect';
import type { TaskFormErrors, TaskPayload } from '@/types/task';
import { validateTaskForm } from '@/utils/validation';

interface TaskFormProps {
  initialValues: TaskPayload;
  title: string;
  submitLabel: string;
  cancelHref: string;
  isSubmitting?: boolean;
  showAssignedToField?: boolean;
  onSubmit: (values: TaskPayload) => Promise<void>;
}

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
] as const;

const STATUS_OPTIONS = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
] as const;

export function TaskForm({
  initialValues,
  title,
  submitLabel,
  cancelHref,
  isSubmitting = false,
  showAssignedToField = false,
  onSubmit,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskPayload>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validateTaskForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save task.');
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl rounded-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {submitError ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              {submitError}
            </div>
          ) : null}

          <FieldErrorWrapper label="Title" error={errors.title}>
            <input
              id="title"
              name="title"
              className={fieldClassName(errors.title)}
              value={values.title}
              onChange={(event) => setValues({ ...values, title: event.target.value })}
              aria-invalid={Boolean(errors.title)}
              required
            />
          </FieldErrorWrapper>

          <FieldErrorWrapper label="Description" error={errors.description}>
            <textarea
              id="description"
              name="description"
              rows={5}
              className={fieldClassName(errors.description, 'min-h-32 resize-y py-3')}
              value={values.description}
              onChange={(event) =>
                setValues({ ...values, description: event.target.value })
              }
              aria-invalid={Boolean(errors.description)}
              required
            />
          </FieldErrorWrapper>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldErrorWrapper label="Priority" error={errors.priority}>
              <select
                id="priority"
                name="priority"
                className={fieldClassName(errors.priority)}
                value={values.priority}
                onChange={(event) =>
                  setValues({
                    ...values,
                    priority: event.target.value as TaskPayload['priority'],
                  })
                }
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FieldErrorWrapper>

            <FieldErrorWrapper label="Status" error={errors.status}>
              <select
                id="status"
                name="status"
                className={fieldClassName(errors.status)}
                value={values.status}
                onChange={(event) =>
                  setValues({
                    ...values,
                    status: event.target.value as TaskPayload['status'],
                  })
                }
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FieldErrorWrapper>
          </div>

          {showAssignedToField ? (
            <FieldErrorWrapper label="Assigned User" error={errors.assignedTo}>
              <UserSelect
                label="Assigned User"
                hideLabel
                value={values.assignedToId ?? null}
                onChange={(assignedToId) => setValues({
                  ...values,
                  assignedToId: assignedToId,
                })}
                error={errors.assignedTo}
              />
            </FieldErrorWrapper>
          ) : null}

          <FieldErrorWrapper label="Due Date" error={errors.dueDate}>
            <input
              id="due-date"
              name="dueDate"
              type="date"
              className={fieldClassName(errors.dueDate)}
              value={values.dueDate}
              onChange={(event) => setValues({ ...values, dueDate: event.target.value })}
              aria-invalid={Boolean(errors.dueDate)}
              required
            />
          </FieldErrorWrapper>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link to={cancelHref}>
              <Button className="w-full sm:w-auto" type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button className="w-full sm:w-auto" type="submit" isLoading={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function FieldErrorWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const fieldId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={fieldId}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldClassName(error?: string, extra = '') {
  return [
    'h-10 w-full rounded-md border bg-white px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20',
    error ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}
