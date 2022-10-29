import React, {useRef} from 'react';
// import Box from '@mui/material/Box';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Mainlist from './Mainlist';
import CreateAccount from './CreateAccount';
import {ProtectedRoute} from './ProtectedRoute';
import {AuthProvider, useAuth} from './AuthProvider';
import {useLocalStorage} from './UseLocalStorage';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const authentication = useAuth();
  const data = useLocalStorage('user', null);
  let user = false;

  useRef(() => {
    authentication.setUser(data);
    user = authentication.user;
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/createaccount' element={<CreateAccount/>} />
          <Route path='/' element=
            {user ? <Navigate to='/mainlist'/> : <Login/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/mainlist' element={<div>
              <Mainlist/><Navbar/><Sidebar/>
            </div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
