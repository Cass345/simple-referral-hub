import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { MainSidebar } from './Sidebar';

export function PrivateLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <MainSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}