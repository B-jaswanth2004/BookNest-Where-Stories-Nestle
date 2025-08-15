const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
