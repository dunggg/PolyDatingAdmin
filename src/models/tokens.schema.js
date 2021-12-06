const mongoose = require("mongoose");

const Tokens = new mongoose.Schema(
    {
        email: String,
        token: String,
        createdAt: String,
    },
    { timestamps: false }
);

module.exports = mongoose.model("tokens", Tokens);
