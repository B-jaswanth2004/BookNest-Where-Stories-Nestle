// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   genre: String,
//   price: Number,
//   format: [String],
//   stock: Number,
// });

// module.exports = mongoose.model('Book', bookSchema);



const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  image: String, // URL or base64 string
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // For sellers
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
