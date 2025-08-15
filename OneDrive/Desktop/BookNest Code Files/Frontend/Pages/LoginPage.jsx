import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('${API_BASE_URL}/api/auth/login', {
        email,
        password
      });

      const user = res.data.user;

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // console.log(storedUser._id);

      const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser._id); // This should NOT be undefined


      // Redirect to homepage
      alert("Login success");
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center bg-light">
      <div className="login-container shadow-lg p-5 bg-white rounded row w-75">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-center mb-4 text-primary fw-bold">Welcome Back 👋</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
