import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState(user || {});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE_URL}/api/users/profile/${user._id}`, formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      setMessage('❌ Failed to update profile.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4 text-center text-success">Edit Profile</h3>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password || ''}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
