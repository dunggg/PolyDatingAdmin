const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    emailUser: String,
    emailLike: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("favorites", Favorite);
