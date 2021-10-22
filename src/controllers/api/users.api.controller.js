const multer = require("multer");
const User = require("../../models/user.shema");
const { response, validateUser, uploadMulter } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(response(200, "Get list user successfully", { total: data.length, users: data }));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};//

exports.insert = (req, res) => {
    try {
        uploadMulter(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code == 'LIMIT_FILE_SIZE')
                    return res.status(400).json(response(400, err.message));
            }

            const arr = [];

            for (let index = 0; index < req.files.length; index++) {
                arr.push('public/data-image/' + req.files[index].filename);
            }

            const { error, value } = validateUser.validate(req.body);

            if (error) return res.status(400).json(response(400, error.message));

            const info = {
                email: value.email,
                name: value.name,
                avatars: arr,
                hobbies: value.hobbies,
                birthDay: value.birthDay,
                gender: value.gender,
                facilities: value.facilities,
                specialized: value.specialized,
                course: value.course,
            };

            User.create(info)
                .then(() => res.status(201).json(response(201, "Create account successfully")))
                .catch((err) => res.status(400).json(response(400, err.message)));

        });
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};
