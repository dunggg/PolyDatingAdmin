const mongoose = require("mongoose");

const Notifications = new mongoose.Schema(
  {
    emailSender: String,
    emailReceiver: String,
    title: String,
    content: String,
    link: String,
    randomKey: String,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("notifications", Notifications);
