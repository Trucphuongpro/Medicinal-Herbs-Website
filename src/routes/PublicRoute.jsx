import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/token';

function PublicRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
