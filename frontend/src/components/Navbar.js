/* eslint-disable */

import React from 'react';
import './Navbar.css';
import {useAuth} from './AuthProvider';

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

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Pantry
      </a>
      <ul>
        <li>
          Profile
        </li>
        <li>
          <a onClick={onLogout} href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
}
