const mongoose = require("mongoose");

const Reports = new mongoose.Schema(
  {
    emailReceiver: String,
    emailSender: String,
    title: String,
    content: String,
    images: String,
    status: Boolean,
    createdAt: String,
    updatedAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("reports", Reports);
