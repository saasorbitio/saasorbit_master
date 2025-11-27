// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // hashed
    googleId: { type: String }, // for Google login later
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
