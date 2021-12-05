const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    userBeLiked: Object,
    userLiked: Object,
    status: Boolean,
    createdAt: String
  },
  { timestamps: false }
);

module.exports = mongoose.model("favorites", Favorite);
