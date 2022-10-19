import React from 'react';
import Box from '@mui/material/Box';

import Login from './Login';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      height: '95vh',
    //  border: 'solid',
    }}>
      <Login/>
    </Box>
  // <Dummy />
  );
}

export default App;
