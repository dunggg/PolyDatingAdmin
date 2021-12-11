let mongoose = require("mongoose");

let Friends = new mongoose.Schema(
    {
        myUser: Object,
        friend: Object,
        status: Boolean,
        createdAt: String,
        updatedAt: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("friends", Friends);