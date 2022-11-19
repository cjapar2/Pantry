/* eslint-disable */

import React from 'react';
import SelectList from './SelectList';
import { Typography } from '@mui/material';
import './Sidebar.css';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-buttons'>
        <ul>
          <li> <a href="test1">Join a Group</a></li>
          <li> <a href="test2">Create a Group</a></li>
          <li> <a href="test3">Other Stuff</a></li>
          <li> <a href="test4">Settings</a></li>
          <li> <Typography> Select List to View/Edit:</Typography> </li>
          <li> <SelectList /> </li>
        </ul>
      </div>
    </div>
  );
}
