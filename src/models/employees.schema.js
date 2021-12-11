let mongoose = require("mongoose");

let Employee = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: String,
        name: String,
        images: String,
        accessToken: String,
        isActive: Boolean,
        createdAt: String,
        updatedAt: String
    },
    { timestamps: false }
);

module.exports = mongoose.model("employees", Employee);