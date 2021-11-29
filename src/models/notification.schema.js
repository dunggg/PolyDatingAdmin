const mongoose = require("mongoose");

const Notification = new mongoose.Schema(
  {
    emailReceiver: [String],
    title: String,
    content: String,
    link: String,
    facilities: String,
    specialized: String,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("notifications", Notification);
