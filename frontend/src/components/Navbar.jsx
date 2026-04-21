import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../App';

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
        <span className="team-name">Birds in the TRAP</span>
        <span className="team-tag">21CSS301T</span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/view"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Team
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Add Member
        </NavLink>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
