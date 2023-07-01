import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const storedToken = localStorage.getItem('token');

  return isAuthenticated || storedToken ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
}
