const express = require('express');
const router = express.Router();
const {
  getUsers, deleteUser,
  getBooks, deleteBook,
  getFeedback, deleteFeedback
} = require('../controllers/adminController');

const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth); // Must be logged in
router.use(requireRole('admin')); // Must be admin

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/books', getBooks);
router.delete('/books/:id', deleteBook);
router.get('/feedback', getFeedback);
router.delete('/feedback/:id', deleteFeedback);

module.exports = router;
