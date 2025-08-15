import { useEffect, useState } from 'react';
import axios from 'axios';
import "./SellerDashboard.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const SellerDashboard = () => {
  const seller = JSON.parse(localStorage.getItem('user'));
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '', author: '', genre: '', price: '', stock: '', image: ''
  });
  const [success, setSuccess] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/seller/books/${seller._id}`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (!form.title || !form.author || !form.price || !form.stock) {
      alert('Please fill required fields.');
      return;
    }

    try {
      await axios.post('${API_BASE_URL}/api/seller/books', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        sellerId: seller._id
      });
      setForm({ title: '', author: '', genre: '', price: '', stock: '', image: '' });
      setSuccess('✅ Book added successfully!');
      fetchBooks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add book');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/seller/books/${id}`);
      fetchBooks();
    } catch (err) {
      alert('❌ Failed to delete book');
    }
  };

  return (
    <div className="seller-container">
      <h2 className="text-center mb-4">📦 Seller Dashboard</h2>

      <div className="add-form card shadow p-4 mb-5">
        <h4 className="mb-3">➕ Add New Book</h4>

        <div className="row g-3">
          <input className="form-control" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="form-control" placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <input className="form-control" placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
          <input className="form-control" placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="form-control" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
          <input className="form-control" placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        </div>

        <button className="btn btn-success mt-3" onClick={handleAddBook}>Add Book</button>
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>

      <h3 className="mb-3">📚 My Listed Books</h3>
      <div className="row">
        {books.length === 0 ? (
          <p className="text-muted">No books listed yet.</p>
        ) : (
          books.map(book => (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card h-100 shadow-sm">
                {book.image && (
                  <img src={book.image} className="card-img-top" alt={book.title} style={{ height: '250px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-muted">{book.author} — {book.genre}</p>
                  <p><strong>₹{book.price}</strong> | Stock: {book.stock}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
