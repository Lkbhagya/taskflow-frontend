import type { AppUser } from '@/types/user';
import type { Task } from '@/types/task';

export const MOCK_USERS: AppUser[] = [
  { id: 1, name: 'Alex Morgan', email: 'admin@taskflow.com', role: 'ADMIN' },
  { id: 2, name: 'Jane Cooper', email: 'jane@taskflow.com', role: 'USER' },
  { id: 3, name: 'John Smith', email: 'john@taskflow.com', role: 'USER' },
];

export const DEMO_PASSWORD = 'password123';

export const SEED_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design sprint planning board',
    description: 'Prepare the sprint board layout and define milestones for the design team.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '2026-07-01',
    createdBy: 'Alex Morgan',
    assignedTo: 'Jane Cooper',
    assignedToId: 2,
    createdAt: '2026-06-10T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Review API integration specs',
    description: 'Validate authentication and task endpoints against frontend service contracts.',
    priority: 'MEDIUM',
    status: 'OPEN',
    dueDate: '2026-06-28',
    createdBy: 'Alex Morgan',
    assignedTo: 'John Smith',
    assignedToId: 3,
    createdAt: '2026-06-12T11:30:00.000Z',
  },
  {
    id: '3',
    title: 'Prepare Q2 roadmap draft',
    description: 'Compile delivery metrics and outline priorities for the next quarter.',
    priority: 'LOW',
    status: 'DONE',
    dueDate: '2026-06-20',
    createdBy: 'Jane Cooper',
    assignedTo: 'Jane Cooper',
    assignedToId: 2,
    createdAt: '2026-06-01T08:15:00.000Z',
  },
  {
    id: '4',
    title: 'Payment gateway reconciliation',
    description: 'Investigate failed transactions and update reconciliation workflow.',
    priority: 'HIGH',
    status: 'OPEN',
    dueDate: '2026-06-25',
    createdBy: 'John Smith',
    assignedTo: 'John Smith',
    assignedToId: 3,
    createdAt: '2026-06-18T14:00:00.000Z',
  },
  {
    id: '5',
    title: 'Update onboarding documentation',
    description: 'Refresh internal wiki pages for new team members joining the workflow platform.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    dueDate: '2026-07-05',
    createdBy: 'Jane Cooper',
    assignedTo: 'Unassigned',
    assignedToId: null,
    createdAt: '2026-06-15T10:45:00.000Z',
  },
];
