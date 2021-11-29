const mongoose = require("mongoose");

const Master = new mongoose.Schema(
    {
        facilities: [String],
        specialized: [String],
        course: [String],
        reports: [String],
        hobbies: [String]
    },
    { timestamps: false }
);

module.exports = mongoose.model("masters", Master);
