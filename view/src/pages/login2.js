import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login2() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/user/login', {
          username,
          password
        });
  
        console.log('Login successful!', response.data);
        localStorage.setItem('role', response.data.role);
  
        navigate('/pertengahan');
      } catch (error) {
        console.error('Login error:', error); 
      }
    };

    return (
        <div className='container'>
        <h2>Login</h2>
        <div className='form-group'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder='paceganteng'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder='******'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
          }}>
          <button className='btn btn-success' onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
}

export default Login2