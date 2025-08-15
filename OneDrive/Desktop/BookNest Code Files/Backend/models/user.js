// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: String,
//   role: { type: String, default: 'buyer' }
// });

// // Fix: Check if model already exists
// module.exports = mongoose.models.User || mongoose.model('User', userSchema);


// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String
});
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
