const mongoose = require("mongoose");

const Friend = new mongoose.Schema(
    {
        myEmail: String,
        friends: Object,
        createdAt: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("friends", Friend);