// const express = require('express');
// const router = express.Router();
// const { getAllBooks } = require('../controllers/bookController');

// // router.get('/', getAllBooks);
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch books' });
//   }
// });

// //export default router;

// module.exports = router;


const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // ✅ Import Book model

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // ✅ Now Book is defined
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
