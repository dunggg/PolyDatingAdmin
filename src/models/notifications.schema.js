let mongoose = require("mongoose");

let Notifications = new mongoose.Schema(
  {
    emailSender: String,
    emailReceiver: String,
    title: String,
    content: String,
    link: String,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("notifications", Notifications);
