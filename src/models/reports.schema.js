let mongoose = require("mongoose");

let Reports = new mongoose.Schema(
  {
    emailSender: String,
    emailReceiver: String,
    title: String,
    content: String,
    images: String,
    status: String,
    createdAt: Date,
  },
  { timestamps: false }
);

module.exports = mongoose.model("reports", Reports);
