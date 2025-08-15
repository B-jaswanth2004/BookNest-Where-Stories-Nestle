const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); // ✅ add this
const orderRoutes = require('./routes/orderRoutes'); 
const cartRoutes = require('./routes/cartRoutes');
const seller = require('./routes/sellerRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // ✅ mount books route
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/seller', seller);


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('✅ Server running on port 5000')))
  .catch(err => console.log(err));
