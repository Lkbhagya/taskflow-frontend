import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'priority-low' | 'priority-medium' | 'priority-high' | 'status-open' | 'status-progress' | 'status-done' | 'role';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
