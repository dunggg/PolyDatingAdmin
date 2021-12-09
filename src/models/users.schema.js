const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    email: { type: String, unique: true },
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
    statusHobby: Boolean,
    reportNumber: Number,
    code: String,
    createdAt: String,
    updatedAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("users", Users);
