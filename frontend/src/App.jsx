import React, { useState, useEffect } from 'react';
import './App.css';
import TextService from './components/TextService';
import UserService from './components/UserService';
// import ImageService from './components/ImageService';

export default function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
    <div className="App">
      <h1>Welcome to the Microservice Web Application</h1>
      
      {!userId ? (
        <UserService onLogin={handleLogin} />
      ) : (
        <>
          <button 
            onClick={handleLogout} 
            style={{ 
              marginBottom: '20px', 
              backgroundColor: '#ff4d4d', 
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
          <TextService />
        </>
      )}
    </div>
  );
}
