/* eslint-disable */

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
  };

  const navigateToMainlist = () => {
    const origin = location.state?.from?.pathname || '/mainlist';
    navigate(origin);
  }

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', {replace: true});
  };

  const getToken = () => {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    return String(userLocal['accessToken']);
  };

  const getID = () => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    return String(userLocal['id']);
  }

  const getName = () => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    return String(userLocal['name']);
  }

  return <AuthContext.Provider value=
    {{user, setUser, login, logout, getToken, getID, getName, navigateToMainlist}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
