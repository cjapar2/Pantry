/* eslint-disable */

import React, {useRef, useState} from 'react';
// import Box from '@mui/material/Box';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import {ProtectedRoute} from './ProtectedRoute';
import {AuthProvider, useAuth} from './AuthProvider';
import {useLocalStorage} from './UseLocalStorage';

import MainScreen from './MainScreen';
import './App.css';
import Fridge from './fridge.js';
import background from '../asset/background.jpg';


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */

 const dataBaseContext = React.createContext();

function App() {
  const authentication = useAuth();
  const [dataChanged, setDataChanged] = React.useState(false);
  const [currentList, setCurrentList] = React.useState({});
  const [availableLists, setAvailableLists] = React.useState([]);
  const [listTitle, setListTitle] = React.useState('List Name');
  const [listId, setListId] = React.useState('');
  const data = useLocalStorage('user', null);
  let user = false;

  useRef(() => {
    authentication.setUser(data);
    user = authentication.user;
  });

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <dataBaseContext.Provider
            value={{dataChanged, setDataChanged, currentList, setCurrentList,
              availableLists, setAvailableLists, listTitle, setListTitle,
              listId, setListId
            }}>
            <Routes>
              <Route path='/createaccount' element={<CreateAccount/>} />
              <Route path='/' element=
                {user ? <Navigate to='/mainlist'/> : <Login/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route path='/mainlist' element={<MainScreen />} />
              </Route>
            </Routes>
          </dataBaseContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}


export default App;
export {
  dataBaseContext,
};