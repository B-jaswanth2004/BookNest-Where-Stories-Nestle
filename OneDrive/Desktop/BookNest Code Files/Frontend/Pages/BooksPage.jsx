import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BooksPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;


const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('${API_BASE_URL}/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item._id === book._id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('✅ Book added to cart!');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">📚 Browse Books</h2>
      <div className="row">
        {books.map(book => (
          <div key={book._id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={book.image}
                className="card-img-top book-img"
                alt={book.title || 'Book cover'}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title || 'Untitled'}</h5>
                <p className="card-text mb-1"><strong>Author:</strong> {book.author || 'Unknown'}</p>
                <p className="card-text mb-1"><strong>Genre:</strong> {Array.isArray(book.genre) ? book.genre.join(', ') : book.genre || 'N/A'}</p>
                <p className="card-text mb-2"><strong>Price:</strong> ₹{book.price || 0}</p>
                <button
                  className="btn btn-sm btn-primary mt-auto"
                  onClick={() => handleAddToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
