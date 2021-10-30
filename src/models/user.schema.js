const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
    avatars: Array,
    hobbies: Array,
    birthDay: String,
    gender: String,
    description: String,
    facilities: String,
    specialized: String,
    course: String,
    isShow: Array,
    isActive: String,
    status: String,
    role: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
