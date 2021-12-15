let mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), 'Asia/Bangkok');

let Users = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  images: [String],
  hobbies: [String],
  gender: String,
  birthDay: String,
  phone: String,
  description: String,
  facilities: String,
  specialized: String,
  course: String,
  isShow: [String],
  isActive: String,
  role: String,
  statusHobby: Boolean,
  reportNumber: Number,
  code: String,
  accessToken: String,
  notificationToken: String,
  createdAt: { type: Date, default: dateThailand },
  updatedAt: Date,
});

module.exports = mongoose.model('users', Users);
