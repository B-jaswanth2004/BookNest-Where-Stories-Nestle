const express = require('express');
const router = express.Router();

const { updateProfile } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('User route is active');
});

router.put('/profile/:userId', updateProfile);

module.exports = router;
