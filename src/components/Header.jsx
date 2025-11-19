import React from 'react';

const Header = ({ onAuthClick }) => (
  <header className="header">
    <h1>Tic-Tac-Toe</h1>
    <div className="auth-links">
      <button onClick={() => onAuthClick('register')}>Register</button>
      <span> | </span>
      <button onClick={() => onAuthClick('login')}>Sign In</button>
    </div>
  </header>
);

export default Header;