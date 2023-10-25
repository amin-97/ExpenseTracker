import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Optional CSS for styling the navbar

function Navbar() {
  return (
    <div className="navbar">
      <Link className="nav-item" to="/">Welcome</Link>
      <Link className="nav-item" to="/signup">Sign Up</Link>
      <Link className="nav-item" to="/login">Login</Link>
    </div>
  );
}

export default Navbar;
