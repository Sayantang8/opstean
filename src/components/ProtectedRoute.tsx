
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

const ProtectedRoute = ({ children, requiredRole = ['admin'] }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  console.log('ProtectedRoute - User:', user?.email);
  console.log('ProtectedRoute - Profile:', profile);
  console.log('ProtectedRoute - Loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  if (!profile) {
    console.log('No profile found, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole) 
    ? requiredRole.includes(profile.role) 
    : profile.role === requiredRole;

  if (!hasRequiredRole) {
    console.log('User role not authorized:', profile.role);
    return <Navigate to="/admin/login" replace />;
  }

  console.log('User authorized with role:', profile.role);
  return <>{children}</>;
};

export default ProtectedRoute;
