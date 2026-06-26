import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { CreateTask } from '@/pages/tasks/CreateTask';
import { EditTask } from '@/pages/tasks/EditTask';
import { TaskDetails } from '@/pages/tasks/TaskDetails';
import { TaskList } from '@/pages/tasks/TaskList';
import { Users } from '@/pages/users/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [{ path: '/dashboard', element: <Dashboard /> }],
          },
          { path: '/tasks', element: <TaskList /> },
          { path: '/tasks/create', element: <CreateTask /> },
          { path: '/tasks/:id', element: <TaskDetails /> },
          { path: '/tasks/:id/edit', element: <EditTask /> },
          // { path: '/profile', element: <Profile /> },
          {
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [{ path: '/users', element: <Users /> }],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
