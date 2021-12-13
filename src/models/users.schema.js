let mongoose = require("mongoose");

let Users = new mongoose.Schema(
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
    isActive: String,
    statusHobby: Boolean,
    reportNumber: Number,
    code: String,
    accessToken: String,
    createdAt: Date,
    updatedAt: Date
  },
  { timestamps: false }
);

module.exports = mongoose.model("users", Users);
