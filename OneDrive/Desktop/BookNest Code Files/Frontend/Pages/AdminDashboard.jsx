import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const fetchAll = async () => {
    const [u, b, f] = await Promise.all([
      axios.get('${API_BASE_URL}api/admin/users'),
      axios.get('${API_BASE_URL}api/admin/books'),
      axios.get('${API_BASE_URL}api/admin/feedback')
    ]);
    setUsers(u.data);
    setBooks(b.data);
    setFeedback(f.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const deleteUser = async (id) => {
    await axios.delete(`${API_BASE_URL}api/admin/users/${id}`);
    fetchAll();
  };

  const deleteBook = async (id) => {
    await axios.delete(`${API_BASE_URL}api/admin/books/${id}`);
    fetchAll();
  };

  const deleteFeedback = async (id) => {
    await axios.delete(`${API_BASE_URL}api/admin/feedback/${id}`);
    fetchAll();
  };

  return (
    <div>
      <h2>🛠 Admin Dashboard</h2>

      <h3>👥 Users</h3>
      {users.map(u => (
        <div key={u._id}>
          {u.name} — {u.email}
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}

      <h3>📚 Books</h3>
      {books.map(b => (
        <div key={b._id}>
          {b.title} by {b.author}
          <button onClick={() => deleteBook(b._id)}>Delete</button>
        </div>
      ))}

      <h3>⭐ Feedback</h3>
      {feedback.map(f => (
        <div key={f._id}>
          {f.userId?.name} rated {f.bookId?.title} — {f.rating}⭐
          <p>{f.comment}</p>
          <button onClick={() => deleteFeedback(f._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
