let mongoose = require("mongoose");

let Employees = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: String,
        name: String,
        images: String,
        isActive: String,
        accessToken: String,
        createdAt: Date,
        updatedAt: Date
    },
    { timestamps: false }
);

module.exports = mongoose.model("employees", Employees);