const mongoose = require("mongoose");

const Notifications = new mongoose.Schema(
  {
    emailSender: String,
    emailReceiver: [Object],
    title: String,
    content: String,
    link: String,
    other: Object,
    randomKey: String,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("notifications", Notifications);
