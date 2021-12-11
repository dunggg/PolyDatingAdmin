const mongoose = require("mongoose");

const Reports = new mongoose.Schema(
  {
    emailSender: String,
    emailReceiver: String,
    title: String,
    content: String,
    images: String,
    status: String,
    createdAt: String,
  },
  { timestamps: false }
);

module.exports = mongoose.model("reports", Reports);
