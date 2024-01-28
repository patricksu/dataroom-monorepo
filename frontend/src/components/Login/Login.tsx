// src/views/Login/Login.tsx
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuthContext();
  const [username, setUsername] = useState('');


  const handleLogin = () => {
    login(username);
  };

  return (
<div style={{ 
    maxWidth: '300px', 
    margin: '0 auto', 
    padding: '20px', 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    textAlign: 'center', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}}>
    <h1 style={{ color: '#333' }}>Login</h1>
    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
        <label style={{ marginBottom: '5px', display: 'inline-block' }}>Username:</label>
        <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ 
                width: '100%', 
                padding: '8px', 
                margin: '5px 0', 
                border: '1px solid #ddd', 
                borderRadius: '4px' 
            }} 
        />
    </div>
    <button 
        onClick={handleLogin}
        style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 15px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
    >
        Login
    </button>
</div>

  );
};

export default Login;
