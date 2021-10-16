const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: String,
    avatars: Array,
    hobbies: Array,
    birthDay: String,
    gender: String,
    description: { type: String, default: null },
    facilities: String,
    specialized: String,
    course: String,
    isActive: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
