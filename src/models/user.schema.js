const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
    images: [String],
    hobbies: [String],
    birthDay: String,
    gender: String,
    description: String,
    facilities: String,
    specialized: String,
    course: String,
    isShow: [String],
    isActive: Boolean,
    status: Boolean,
    roleAdmin: Boolean,
    createdAt: String,
    updatedAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("users", User);
