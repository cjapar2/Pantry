/* eslint-disable */

import React from 'react';
import './Navbar.css';
import {useAuth} from './AuthProvider';
import { Popover, Typography, Button } from '@mui/material';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Navbar() {
  const authentication = useAuth();

  const onLogout = (event) => {
    event.preventDefault();
    authentication.logout();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfile = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Pantry
      </a>
      <ul>
        <li>
          <Button onClick={openProfile}>Profile</Button>
          <Popover
            id="profile"
            open={open}
            anchorEl={anchorEl}
            onClose={closeProfile}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>Name: {authentication.getName()}</Typography>
            <Typography sx={{ p: 2 }}>User ID: {authentication.getID()}</Typography>
          </Popover>
        </li>
        <li>
          <Button onClick={onLogout} href="/">Logout</Button>
        </li>
      </ul>
    </nav>
  );
}
