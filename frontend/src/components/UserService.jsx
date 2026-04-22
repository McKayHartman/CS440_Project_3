import React, { useState } from 'react';
import axios from 'axios';
import './UserService.css';

export default function UserService({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const GATEWAY_URL = 'http://localhost:4000/api/users';

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${GATEWAY_URL}/register`, {
        username: newUsername,
        password: newPassword,
      });
      console.log('Registration successful:', response.data);
      const userId = response.data.user.id;
      localStorage.setItem('userId', userId);
      onLogin(userId);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${GATEWAY_URL}/login`, {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      const userId = response.data.user.id;
      localStorage.setItem('userId', userId);
      onLogin(userId);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="UserService">
      <div className="auth-section">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <hr style={{ width: '100%', margin: '20px 0' }} />

      <div className="auth-section">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
