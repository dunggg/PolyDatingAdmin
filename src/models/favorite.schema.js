const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    emailBeLiked: String,
    userLiked: Object,
    status: Boolean,
    createdAt: Date
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("favorites", Favorite);
