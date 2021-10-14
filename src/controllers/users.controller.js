const User = require("../models/user.shema");
const { baseJson, validateUser } = require("../utils/utils");

exports.list = async (req, res) => {
    try {
        await User.find()
            .then(data => res.render('users', { users: data }))
            .catch(err => res.status(400).json(baseJson(400, err.message)));

    } catch (error) {
        res.status(500).json(baseJson(500, error.message));
    }
};