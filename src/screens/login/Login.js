import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/home')
  };

  return (
    <div>
      {/* Your login form and logic here */}
      <h2>Login</h2>
      {/* Example fields */}
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button onClick={handleHomeClick}>Submit</button>
    </div>
  );
}

export default Login;
