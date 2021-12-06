const mongoose = require("mongoose");

const Friends = new mongoose.Schema(
    {
        myEmail: String,
        friend: Object,
        status: Boolean,
        createdAt: String,
        updatedAt: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("friends", Friends);