import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/token';

function PrivateRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
