// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order');

// // Place an order
// router.post('/', async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     const saved = await order.save();
//     res.status(201).json({ message: 'Order placed successfully', order: saved });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to place order' });
//   }
// });


// // ✅ FIXED: Get all orders of a user (with book details populated)
// router.get('/user/:userId', async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).populate('books.bookId');
//     res.status(200).json(orders);
//   } catch (err) {
//     console.error('Fetch orders error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// // Cancel an order
// router.put('/cancel/:id', async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: 'Cancelled' },
//       { new: true }
//     );
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: 'Cancel failed' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order'); // Make sure this model exists

// // ✅ Route to get orders of a specific user
// router.get('/user/:userId', async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).populate('books.bookId');
//     res.json(orders);
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ error: 'Failed to fetch user orders' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');


// // router.get('/user/:userId', async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const orders = await Order.find({ userId });
// //     res.json(orders);
// //   } catch (err) {
// //     console.error('Error fetching user orders:', err);
// //     res.status(500).json({ error: 'Failed to fetch orders' });
// //   }
// // });

// // Create new order
// router.post('/', async (req, res) => {
//   console.log("Incoming Order:", req.body); // helpful for debugging

//   const { userId, books, total } = req.body;

//   if (!userId || !books || books.length === 0 || !total) {
//     return res.status(400).json({ error: 'Invalid order data' });
//   }

//   try {
//     const newOrder = new Order({ userId, books, total });
//     await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully' });
//   } catch (err) {
//     console.error('Error placing order:', err.message);
//     res.status(500).json({ error: 'Failed to place order' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { userId, books, total } = req.body;
    if (!userId || !books || books.length === 0 || !total) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const newOrder = new Order({ userId, books, total });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('books.bookId');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
