import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && (storedUser._id || storedUser.id)) {
      setUserId(storedUser._id || storedUser.id); // ✅ supports both _id and id
    } else {
      console.error('User not found or malformed in localStorage');
    }
  }, []);

  const fetchOrders = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h5>Order ID: {order._id}</h5>
              <p>Status: {order.status}</p>
              <ul>
                {order.books.map((b, index) => (
                  <li key={index}>
                    {b.bookId?.title || 'Unknown'} - Qty: {b.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ₹{order.total}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
