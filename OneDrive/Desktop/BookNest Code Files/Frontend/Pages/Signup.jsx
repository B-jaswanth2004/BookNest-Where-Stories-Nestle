import { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Create this file
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('${API_BASE_URL}/api/auth/signup', formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error('FULL SIGNUP ERROR:', err);

      if (err.response) {
        setError(err.response.data?.error || 'Signup failed');
      } else if (err.request) {
        setError('No response from server. Is backend running?');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="signup-container shadow-lg p-5 bg-white rounded row w-75">
        <div className="col-md-6 d-none d-md-block">
          <img
            src="https://i.pinimg.com/736x/43/c0/47/43c04767dc84407724a508142c04e736.jpg"
            alt="Signup Illustration"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-center text-success fw-bold mb-4">Create Account</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
