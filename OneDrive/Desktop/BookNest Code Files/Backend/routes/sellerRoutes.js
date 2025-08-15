const express = require('express');
const router = express.Router();
const {
  addBook,
  getSellerBooks,
  updateBook,
  deleteBook,
  getSellerOrders
} = require('../controllers/sellerController');

router.post('/books', addBook);
router.get('/books/:sellerId', getSellerBooks);
router.put('/books/:bookId', updateBook);
router.delete('/books/:bookId', deleteBook);
router.get('/orders/:sellerId', getSellerOrders);

module.exports = router;
