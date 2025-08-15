const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const { search, genre } = req.query;

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};
