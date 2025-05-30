const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true, null: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
