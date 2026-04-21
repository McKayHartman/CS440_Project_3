import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleRegister = async () => {
    try {
      const data = await axios.post('http://localhost:3000/api/register', {
        username: newUsername,
        password: newPassword,
      });
      console.log('Registration successful:', data.data);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };


  const handleLogin = async () => {
    try {
      const data = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });
      console.log('Login successful:', data.data);
      setLoginStatus('Login successful!, welcome ' + username);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <h1>Login</h1>
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
      <h2>{loginStatus}</h2>
    </div>

  )
}

export default App
