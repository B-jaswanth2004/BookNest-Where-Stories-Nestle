const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { userId, books, totalAmount } = req.body;
    const newOrder = new Order({ userId, books, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to place order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('books.bookId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
