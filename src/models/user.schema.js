const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
    images: Array,
    hobbies: Array,
    birthDay: String,
    gender: String,
    description: String,
    facilities: String,
    specialized: String,
    course: String,
    isShow: Array,
    isActive: Boolean,
    status: Boolean,
    roleAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date
  },
  { timestamps: false }
);

module.exports = mongoose.model("users", User);
