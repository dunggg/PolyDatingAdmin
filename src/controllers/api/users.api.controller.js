const User = require("../../models/user.shema");
const { baseJson, validateUser } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(baseJson(200, "Get list user successfully", { total: data.length, users: data }));

    } catch (error) {
        res.status(500).json(baseJson(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { error, value } = validateUser.validate(req.body);

        if (error) return res.json(baseJson(400, error.message));

        const info = {
            email: value.email,
            name: value.name,
            avatars: value.avatars,
            hobbies: value.hobbies,
            birthDay: value.birthDay,
            gender: value.gender,
            description: value.description,
            facilities: value.facilities,
            specialized: value.specialized,
            course: value.course,
        };

        User.create(info)
            .then(() => res.status(201).json(baseJson(201, "Create account successfully")))
            .catch(err => res.status(400).json(baseJson(400, err.message)));

    } catch (error) {
        res.status(500).json(baseJson(500, error.message));
    }
};
