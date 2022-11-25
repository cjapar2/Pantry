/* eslint-disable */

import React from 'react';
import {StrictMode} from 'react';

// ✅ now importing from react-dom/client
import {createRoot} from 'react-dom/client';
import App from './components/App';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
