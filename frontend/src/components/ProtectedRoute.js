import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from './AuthProvider';

export const ProtectedRoute = () => {
  const {user} = useAuth();
  const location = useLocation();
  return user ? <Outlet/> : <Navigate to='/' replace state={{from: location}}/>;
};
