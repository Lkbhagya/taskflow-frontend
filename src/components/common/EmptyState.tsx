import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="state state--empty">
      <div className="state__icon" aria-hidden="true">
        ◌
      </div>
      <h3 className="state__title">{title}</h3>
      <p className="state__description">{description}</p>
      {action ? <div className="state__action">{action}</div> : null}
    </div>
  );
}
