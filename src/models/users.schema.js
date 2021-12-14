let mongoose = require("mongoose");

let Users = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
    images: [String],
    hobbies: [String],
    gender: String,
    birthDay: Date,
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
    createdAt: Date,
    updatedAt: Date
  },
  { timestamps: false }
);

module.exports = mongoose.model("users", Users);
