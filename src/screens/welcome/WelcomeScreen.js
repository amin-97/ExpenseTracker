import React from 'react';
import './WelcomeScreen.css';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup')
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  return (
    <div className="welcome-container">
    <div className="content">
        <h2>Welcome to the AK expense tracker</h2>
        <button onClick={handleSignupClick}>Sign up</button>
        <button onClick={handleLoginClick}>Login</button>
    </div>
</div>

  );
}

export default WelcomeScreen;
