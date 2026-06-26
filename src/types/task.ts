export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
  assignedToId?: number | null;
  createdBy: string;
  createdById?: number | null;
  createdAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedToId?: number | null;
  assignedTo?: string;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'ALL';
  priority: TaskPriority | 'ALL';
}

export interface TaskStats {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
  assignedTo?: string;
}
