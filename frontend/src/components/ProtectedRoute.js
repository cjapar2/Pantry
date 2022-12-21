

import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from './AuthProvider';

// Creates React Route that only authenticated users can access
export const ProtectedRoute = () => {
  const {user} = useAuth();
  const location = useLocation();
  return user ? <Outlet/> : <Navigate to='/' replace state={{from: location}}/>;
};
