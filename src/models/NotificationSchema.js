const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  emailReceiver: Array,
  title: String,
  link: String,
  content: String,
  facilitie: String,
  specialized: String,
  createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('notifications', notificationSchema);
