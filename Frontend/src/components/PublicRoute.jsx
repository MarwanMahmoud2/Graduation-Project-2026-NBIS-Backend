import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardPath } from '../utils/roles';

export const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return children;
};
