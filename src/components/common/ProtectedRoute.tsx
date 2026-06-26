import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingState } from '@/components/common/LoadingState';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/auth';
import { appConfig } from '../../../appConfig';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (appConfig.bypassAuth) {
    return <Outlet />;
  }

  if (isLoading) {
    return <LoadingState message="Loading application..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.some((role) => hasRole(role))) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
}