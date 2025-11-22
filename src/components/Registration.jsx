import React, { useState } from 'react';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Registering...');
    setIsSuccess(false);

    try {
      const response = await fetch('https://tictocbackend.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success! ${data.message}`);
        setIsSuccess(true);
        // Clear form fields on successful registration
        setUsername('');
        setPassword('');
      } else {
        setMessage(`Error: ${data.message || 'Registration failed.'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setMessage('A network error occurred. Please try again later.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>👤 User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && (
        <p className={isSuccess ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Registration;