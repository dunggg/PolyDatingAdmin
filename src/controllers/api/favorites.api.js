const Favorite = require('../../models/favorite.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
    try {
        const { error, value } = validate.listFavorite.validate(req.params);
        if (error) return res.status(400).json(response(400, error.message));

        const dataUser = await User.findOne({ email: value.emailPersonal });
        if (!dataUser) return res.status(200).json(response(200, "Người dùng không tồn tại", dataUser));

        const dataFavorite = await Favorite.find({ emailPersonal: dataUser.email });

        const payload = {
            total: dataFavorite.length,
            favorites: dataFavorite
        }

        res.status(200).json(response(200, `Lấy danh sách lượt thích của ${dataUser.email} thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { error, value } = validate.insertFavorite.validate(req.body);
        if (error) return res.status(400).json(response(400, error.message));

        const dataPersonal = await User.findOne({ email: value.emailPersonal });
        if (!dataPersonal) return res.status(200).json(response(200, `${dataPersonal.email} không tồn tại`, dataPersonal));

        const dataLike = await User.findOne({ email: value.emailLike });
        if (!dataLike) return res.status(200).json(response(200, `${dataLike.email} không tồn tại`, dataLike));

        if (dataPersonal.email == dataLike.email) return res.status(400).json(response(400, `Không thể tự yêu thích`));

        const payload = {
            emailPersonal: dataPersonal.email,
            emailLike: dataLike.email,
            status: false,
            createdAt: new Date()
        }

        await Favorite.create(payload);
        res.status(201).json(response(201, `Yêu thích ${payload.emailLike} thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        const { error, value } = validate.insertFavorite.validate(req.body);
        if (error) return res.status(400).json(response(400, error.message));

        const data = Favorite.findOne({ emailPersonal: value.emailPersonal, emailLike: value.emailLike });
        if (!data) return res.status(200).json(response(200, "Lời mời kết bạn không tồn tại", data));

        await Favorite.deleteOne({ _id: data._id });
        res.status(200).json(response(200, `Đã xóa ${data.emailLike} khỏi danh sách lời mời kết bạn`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};