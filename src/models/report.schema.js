const mongoose = require("mongoose");

const Report = new mongoose.Schema(
  {
    emailReport: String,
    emailReported: String,
    title: String,
    content: String,
    images: String,
    status: Boolean,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("reports", Report);
