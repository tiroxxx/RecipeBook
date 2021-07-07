import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterScreen({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      history.push('/user');
    }
  }, [history]);

  async function handleSubmit(e) {
    e.preventDefault();

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const { data } = await axios.post(
        '/api/user/register',
        { username, password },
        config
      );

      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('user-id', data.userId);
      history.push('/user');
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        {error && <span>{error}</span>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button> <br />
        <span>
          Already have an account? <Link to="/login-screen">Login</Link>
        </span>
      </form>
    </div>
  );
}
