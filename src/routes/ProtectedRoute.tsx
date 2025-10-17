import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { PATHS } from './paths';
import type { ProtectedRouteProps } from '../config/types';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 to-secondary-800">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-400 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={PATHS.AUTH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}