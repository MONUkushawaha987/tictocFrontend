import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');
    setIsSuccess(false);
    
    try {
      const response = await fetch('https://https-github-com-monukushawaha987.onrender.com/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setMessage(`Welcome back, ${data.user.username}!`);
        setIsSuccess(true);
        
        // Reset form fields
        setUsername('');
        setPassword('');
        
        onLoginSuccess(data.user); 
      } else {
        setMessage(`Error: ${data.message || 'Login failed. Check username and password.'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Login Network Error:', error);
      setMessage('A network error occurred. Please ensure the Node.js server is running.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="registration-container"> 
      <h2>🔑 Fresh User Sign In</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="login-username-fresh">Username:</label>
          <input
            id="login-username-fresh"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password-fresh">Password:</label>
          <input
            id="login-password-fresh"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && (
        <p className={isSuccess ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;