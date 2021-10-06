const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  emailUser: String,
  emailLike: String,
  createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('favorites', favoriteSchema);
