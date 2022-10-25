import React from 'react';
// import Box from '@mui/material/Box';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './Login';
import Dummy from './Dummy';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
