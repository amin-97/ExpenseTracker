import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/home')
  };

  return (
    <div>
      {/* Your sign-up form and logic here */}
      <h2>Sign Up</h2>
      {/* Example fields */}
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button onClick={handleHomeClick}>Submit</button>
    </div>
  );
}

export default Signup;
