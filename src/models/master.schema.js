const mongoose = require("mongoose");

const Master = new mongoose.Schema(
    {
        facilities: Array,
        specialized: Array,
        course: Array,
        reports: Array,
        hobbies: Array
    },
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("masters", Master);
