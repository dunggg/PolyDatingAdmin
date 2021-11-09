const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    emailPersonal: Object,
    emailLike: String,
    status: Boolean,
    createdAt: Date
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("favorites", Favorite);
