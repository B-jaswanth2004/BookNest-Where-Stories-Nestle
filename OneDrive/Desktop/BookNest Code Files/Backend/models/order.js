// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   books: [
//     {
//       bookId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         default: 1
//       }
//     }
//   ],
//   total: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     default: 'Placed'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

// ✅ Fix: Only create model if not already compiled
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
