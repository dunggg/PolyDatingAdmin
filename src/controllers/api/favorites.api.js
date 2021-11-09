const Favorite = require('../../models/favorite.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
    try {
        const { emailPersonal } = req.params;

        const dataFavorite = await Favorite.find({ emailPersonal });

        const payload = {
            total: dataFavorite.length,
            favorites: dataFavorite
        }

        res.status(200).json(response(200, `Lấy danh sách lượt thích của ${emailPersonal} thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { error, value } = validate.insertFavorite.validate(req.body);
        if (error) return res.status(400).json(response(400, error.message));

        const dataPersonal = await User.findOne({ email: value.emailPersonal });
        const dataLike = await User.findOne({ email: value.emailLike });

        const emailPersonal = {
            email: dataPersonal.email,
            name: dataPersonal.name,
            images: dataPersonal.images,
            hobbies: dataPersonal.hobbies,
            birthDay: dataPersonal.birthDay,
            gender: dataPersonal.gender,
            description: dataPersonal.description,
            facilities: dataPersonal.facilities,
            specialized: dataPersonal.specialized,
            course: dataPersonal.course,
        }

        const payload = {
            emailPersonal,
            emailLike: dataLike.email,
            status: false,
            createdAt: new Date()
        }

        await Favorite.create(payload);
        res.status(201).json(response(200, `Yêu thích ${dataLike.email} thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        const { emailPersonal, emailLike } = req.body;

        const data = Favorite.findOne({ emailPersonal, emailLike });

        await Favorite.deleteOne({ _id: data._id });
        res.status(200).json(response(200, `Đã xóa ${emailLike} khỏi danh sách lời mời kết bạn`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};