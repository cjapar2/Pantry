import React from 'react';
// import Box from '@mui/material/Box';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './Login';
import Dummy from './Dummy';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Mainlist from './Mainlist';
import CreateAccount from './CreateAccount';
import Rightbar from './Rightbar';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Dummy/>} />
        <Route path='/mainlist' element={<div>
          <Mainlist/><Navbar/><Sidebar/><Rightbar/>
        </div>} />
        <Route path='/createaccount' element={<CreateAccount/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
