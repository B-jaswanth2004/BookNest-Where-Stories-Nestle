import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/books?search=${search}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  return (
    <div>
      <h2>Browse Books</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="book-list">
        {books.map(book => (
          <div key={book._id} className="book-card ">
            <div className="card h-100 shadow-sm">
            <img src={book.image} alt={book.title} width={120}  className='card-img-top'  style={{ height: '250px', objectFit: 'cover' }}/>
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Genre:</b> {book.genre}</p>
            <p><b>Price:</b> ₹{book.price}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseBooks;
