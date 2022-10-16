import React from 'react';
import Box from '@mui/material/Box';

import Dummy from './Dummy';
import Login from './Login';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <Box sx={{
      width:'100%',
      height:'100vh',
      display:'flex',
      flexDirection:'column',
      border:'solid'
    }}>
      <Login/>
    </Box>
   // <Dummy />
  );
}

export default App;
