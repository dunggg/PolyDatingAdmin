const mongoose = require("mongoose");

const Friend = new mongoose.Schema(
    {
        myEmail: {
            type: String,
            unique: true
        },
        friends: [Object]
    },
    { timestamps: false }
);

module.exports = mongoose.model("friends", Friend);