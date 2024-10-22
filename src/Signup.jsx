// src/Signup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/upload');
  };

  return (
    <div>
      <h1>Signup</h1>
      {/* Add your signup form here */}
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
};

export default Signup;
