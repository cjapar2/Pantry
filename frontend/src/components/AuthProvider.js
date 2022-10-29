import {createContext, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useLocalStorage} from './UseLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const location = useLocation();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    const origin = location.state?.from?.pathname || '/mainlist';
    navigate(origin);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', {replace: true});
  };

  return <AuthContext.Provider value=
    {{user, setUser, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
