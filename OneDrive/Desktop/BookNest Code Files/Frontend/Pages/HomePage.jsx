import React from 'react';
import './HomePage.css'; // Optional: Add extra custom styles

const API_BASE_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Welcome to BookNest 📚</h1>
        <p className="lead text-muted">Your one-stop platform to explore, buy, and sell books effortlessly!</p>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.buTkwZ4KwUT-DIWVff50swHaDt&pid=Api&P=0&h=220"
            alt="BookEase Illustration"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-semibold">📖 About Our Project</h2>
          <p className="text-muted">
            <strong>BookEase</strong> is an innovative web application designed to simplify the process of buying and selling books online. 
            Whether you're a reader searching for your next adventure, a seller managing inventory, or an admin maintaining a seamless experience—
            BookEase is built for you.
          </p>
          <ul className="list-unstyled">
            <li>✔️ Seamless User & Seller Registration</li>
            <li>✔️ Secure Book Purchases and Order Tracking</li>
            <li>✔️ Real-Time Feedback & Review System</li>
            <li>✔️ Powerful Admin Dashboard for Management</li>
          </ul>
          <p className="text-secondary">Built using the <strong>MERN Stack</strong> — MongoDB, Express.js, React, and Node.js.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
