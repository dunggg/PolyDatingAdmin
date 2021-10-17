const User = require("../models/user.shema");
const { response, validateUser } = require("../utils/utils");
const { course, hobbies, specialized, facilities } = require('../config/edu-poly');

exports.list = async (req, res) => {
    try {
        const data = await User.find()

        res.render('users', { users: data, course, specialized, facilities })

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.find = async (req, res, next) => {
    try {
        const data = await User.findOne({ email: req.params.email })

        if (data == null) return next()

        res.render('profile', { user: data })

    } catch (error) {
        next();
    }
}