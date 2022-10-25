import React from 'react';
import './Navbar.css';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Pantry
      </a>
      <ul>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
}
