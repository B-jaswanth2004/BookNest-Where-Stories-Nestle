const Book = require('../models/Book');
const Order = require('../models/Order');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add book' });
  }
};

// Get books by seller
exports.getSellerBooks = async (req, res) => {
  try {
    const books = await Book.find({ sellerId: req.params.sellerId });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seller books' });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

// View seller's orders
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('books.bookId');
    const sellerOrders = orders.filter(order =>
      order.books.some(b => b.bookId && b.bookId.sellerId?.toString() === req.params.sellerId)
    );
    res.status(200).json(sellerOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
