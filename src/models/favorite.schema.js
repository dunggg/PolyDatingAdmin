const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    emailPersonal: String,
    emailLike: Array,
    status: Boolean,
    createdAt: Date
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("favorites", Favorite);
