const User = require('../models/User');

// ✅ Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ name, email, password, role: role || 'buyer', preferences: [] });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: { id: newUser._id, name: newUser.name, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
};

// ✅ Login Controller
const login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email, password, or role' });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  });
};

// ✅ Export both
module.exports = { signup, login };
