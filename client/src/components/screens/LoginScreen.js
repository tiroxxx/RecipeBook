import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LoginScreen({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const { data } = await axios.post(
        '/api/user/login',
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
        <h3>Login</h3>
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
        <button type="submit">Login</button> <br />
        <span>
          Don't have an account? <Link to="/register-screen">Register</Link>
        </span>
      </form>
    </div>
  );
}
