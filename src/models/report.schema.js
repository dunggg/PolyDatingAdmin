const mongoose = require("mongoose");

const Report = new mongoose.Schema(
  {
    emailUser: String,
    emailReport: String,
    title: String,
    content: String,
    images: Array,
    status: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("reports", Report);
