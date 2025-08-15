// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // adjust path as needed

// // Simple login without bcrypt or role check
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.json({ user });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;


// import express from 'express';
// import User from '../models/User.js';
// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ error: 'Email in use' });
//   const user = await User.create({ name, email, password, role });
//   req.session.userId = user._id;
//   res.json({ user: { name: user.name, email: user.email, role: user.role } });
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || user.password !== password)
//     return res.status(401).json({ error: 'Invalid credentials' });
//   req.session.userId = user._id;
//   res.json({ user: { name: user.name, email: user.email, role: user.role } });
// });

// // Check auth
// router.get('/me', async (req, res) => {
//   if (!req.session.userId) return res.status(401).json({ user: null });
//   const user = await User.findById(req.session.userId);
//   res.json({ user: { name: user.name, email: user.email, role: user.role } });
// });

// // Logout
// router.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) return res.status(500).json({ error: 'Logout failed' });
//     res.clearCookie('sid');
//     res.json({ message: 'Logged out' });
//   });
// });

// export default router;


// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email in use' });
  const user = await User.create({ name, email, password, role });
  req.session.userId = user._id;
  res.json({ user: { name: user.name, email: user.email, role: user.role } });
});

// Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || user.password !== password)
//     return res.status(401).json({ error: 'Invalid credentials' });
//   req.session.userId = user._id;
//   res.json({ user: { name: user.name, email: user.email, role: user.role } });
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user._id;

  // ✅ Include user._id in the response
  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});



// Check auth
router.get('/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ user: null });
  const user = await User.findById(req.session.userId);
  res.json({ user: { name: user.name, email: user.email, role: user.role } });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('sid');
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
