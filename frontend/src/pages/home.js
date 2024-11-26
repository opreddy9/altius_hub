import React from 'react';
import { useNavigate } from 'react-router-dom';  

const HomePage = () => {
  const navigate = useNavigate();  

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Platform</h1>
      <div className="button-container">
        <button onClick={handleLoginClick} className="home-button">
          Login
        </button>
        <button onClick={handleRegisterClick} className="home-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
