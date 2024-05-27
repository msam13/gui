// src/NavBar.jsx
import React, { useState } from 'react';
import './NavBar.css';
import logoImage from './images/logo.png'; // Adjust the path to your logo image

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoImage} alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <h1>3D Ready</h1>
      </div>
      <div className="navbar-right">
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="white"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <a href="#about">ABOUT</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
