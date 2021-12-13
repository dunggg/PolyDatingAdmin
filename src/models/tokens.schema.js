let mongoose = require("mongoose");

let Tokens = new mongoose.Schema(
    {
        email: String,
        token: String,
        createdAt: Date,
    },
    { timestamps: false }
);

module.exports = mongoose.model("tokens", Tokens);
