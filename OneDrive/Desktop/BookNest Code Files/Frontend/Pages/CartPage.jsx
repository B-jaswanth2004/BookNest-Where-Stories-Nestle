// import { useState } from 'react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
//   const user = JSON.parse(localStorage.getItem('user'));

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const updateCart = (updatedCart) => {
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const handleIncreaseQty = (bookId) => {
//     const updatedCart = cart.map(item =>
//       item._id === bookId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     updateCart(updatedCart);
//   };

//   const handleDecreaseQty = (bookId) => {
//     const updatedCart = cart
//       .map(item =>
//         item._id === bookId ? { ...item, quantity: item.quantity - 1 } : item
//       )
//       .filter(item => item.quantity > 0);
//     updateCart(updatedCart);
//   };

//   const handleRemoveFromCart = (bookId) => {
//     const updatedCart = cart.filter(item => item._id !== bookId);
//     updateCart(updatedCart);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user || !user._id) {
//       alert('Please login to place an order.');
//       return;
//     }

//     try {
//       await axios.post('${API_BASE_URL}/api/orders', {
//         userId: user._id,
//         books: cart.map(item => ({
//           bookId: item._id,
//           quantity: item.quantity
//         })),
//         totalAmount: total
//       });

//       alert('✅ Order placed successfully!');
//       localStorage.removeItem('cart');
//       setCart([]);
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to place order');
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="mb-4">🛒 Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map((item, index) => (
//             <div key={index} className="card p-3 mb-3 shadow-sm">
//               <div className="row align-items-center">
//                 <div className="col-md-2">
//                   <img src={item.image} alt={item.title} className="img-fluid rounded" />
//                 </div>
//                 <div className="col-md-6">
//                   <h5>{item.title}</h5>
//                   <p className="text-muted mb-1">Price: ₹{item.price}</p>
//                   <p className="text-muted mb-1">Quantity: {item.quantity}</p>
//                 </div>
//                 <div className="col-md-4 d-flex flex-column align-items-end">
//                   <div className="btn-group mb-2">
//                     <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecreaseQty(item._id)}>-</button>
//                     <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQty(item._id)}>+</button>
//                   </div>
//                   <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <h4 className="mt-4">Total: ₹{total}</h4>
//           <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>Place Order</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CartPage.css';


// const CartPage = ({ cartItems = [], totalAmount = 0 }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handlePlaceOrder = async () => {
//     if (!user || !cartItems.length) {
//       alert("Invalid order data.");
//       return;
//     }

//     const orderData = {
//       userId: user._id,
//       books: cartItems.map(item => ({
//         bookId: item._id,
//         quantity: item.quantity || 1
//       })),
//       total: totalAmount
//     };

//     try {
//       const res = await axios.post('${API_BASE_URL}/api/orders', orderData);
//       alert('Order placed successfully!');
//     } catch (err) {
//       console.error('Order Error:', err.response?.data || err.message);
//       alert('Failed to place order.');
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>

//       {cartItems?.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item._id}>
//             <p>{item.title} - ₹{item.price} × {item.quantity}</p>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}

//       <h3>Total: ₹{totalAmount}</h3>
//       <button onClick={handlePlaceOrder}>Place Order</button>
//     </div>
//   );
// };

// export default CartPage;


// 




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);
// const [userId, setUserId] = useState('');


  
//   // const user = JSON.parse(localStorage.getItem("user")); // Change key if needed
//   // const userId = user?._id;

//   // useEffect(() => {
//   //   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//   //   setCartItems(storedCart);
//   //   calculateTotal(storedCart);
//   // }, []);

// useEffect(() => {
//   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//   setCartItems(storedCart);
//   calculateTotal(storedCart);

//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   if (storedUser?._id) {
//     setUserId(storedUser._id);
//   }
// }, []);


//   const calculateTotal = (items) => {
//     const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotal(sum);
//   };

//   const handlePlaceOrder = async () => {
//     const payload = {
//       userId,
//       books: cartItems.map(item => ({
//         bookId: item._id,
//         quantity: item.quantity
//       })),
//       total
//     };

//     console.log("Placing order with payload:", payload);

//     if (!payload.userId || payload.books.length === 0 || payload.books.some(b => !b.bookId)) {
//       alert("Order data is incomplete.");
//       return;
//     }

//     try {
//       await axios.post('${API_BASE_URL}/api/orders', payload);
//       alert('Order placed!');
//       setCartItems([]);
//       setTotal(0);
//       localStorage.removeItem('cart');
//     } catch (err) {
//       console.error("Order error:", err.response?.data || err.message);
//       alert('Failed to place order');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="alert alert-warning">Your cart is empty.</div>
//       ) : (
//         <div className="card shadow-sm p-3 mb-4">
//           <ul className="list-group list-group-flush">
//             {cartItems.map((item, index) => (
//               <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="mb-1">{item.title}</h6>
//                   <small>Quantity: {item.quantity}</small>
//                 </div>
//                 <span>₹{item.price * item.quantity}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="card-body d-flex justify-content-between align-items-center">
//             <h5>Total: ₹{total}</h5>
//             <button className="btn btn-primary" onClick={handlePlaceOrder}>
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);

    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const handlePlaceOrder = async () => {
    const payload = {
      userId,
      books: cartItems.map(item => ({
        bookId: item._id,
        quantity: item.quantity
      })),
      total
    };

    console.log("Placing order with payload:", payload);

    if (!payload.userId || payload.books.length === 0 || payload.books.some(b => !b.bookId)) {
      alert("Order data is incomplete.");
      return;
    }

    try {
      const response = await axios.post('${API_BASE_URL}/api/orders', payload);
      console.log("Order placed:", response.data);
      alert('Order placed successfully!');
      
      // Clear cart
      setCartItems([]);
      setTotal(0);
      localStorage.removeItem('cart');
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert('Failed to place order');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">Your cart is empty.</div>
      ) : (
        <div className="card shadow-sm p-3 mb-4">
          <ul className="list-group list-group-flush">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <small>Quantity: {item.quantity}</small>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="card-body d-flex justify-content-between align-items-center">
            <h5>Total: ₹{total}</h5>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
