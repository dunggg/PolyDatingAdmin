const Favorite = require('../../models/favorite.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");

// Lấy danh sách lời mời kết bạn
exports.listBeLiked = async (req, res) => {
    try {
        const { emailBeLiked } = req.params;

        const dataFavorite = await Favorite.find({ 'userBeLiked.email': emailBeLiked });

        const payload = {
            total: dataFavorite.length,
            favorites: dataFavorite
        }

        res.status(200).json(response(200, `Lấy danh sách lời mời kết bạn của ${emailBeLiked}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Lấy danh sách yêu cầu kết bạn đã gửi
exports.listLiked = async (req, res) => {
    try {
        const { emailLiked } = req.params;

        const dataFavorite = await Favorite.find({ 'userLiked.email': emailLiked });

        const payload = {
            total: dataFavorite.length,
            favorites: dataFavorite
        }

        res.status(200).json(response(200, `Lấy danh sách yêu cầu kết bạn của ${emailLiked}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { emailBeLiked, emailLiked } = req.body;

        const dataBeLiked = await User.findOne({ email: emailBeLiked }); //B
        const dataLiked = await User.findOne({ email: emailLiked }); // A

        // neu A gui loi ket ban voi B roi thi se hien thi thanh Huy ket ban

        const option = {
            'userBeLiked.email': emailBeLiked,
            'userLiked.email': emailLiked
        }

        const userFavorite = await Favorite.findOne(option);
        if (userFavorite) return res.status(400).json(response(400, 'Đã gửi lời mời'))

        const payload = {
            userBeLiked: dataBeLiked,
            userLiked: dataLiked,
            status: false,
            createdAt: req.getTime
        }

        await Favorite.create(payload);
        res.status(201).json(response(200, `Yêu thích ${dataBeLiked.name}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.update = async (req, res) => {
    try {
        const { emailBeLiked, emailLiked } = req.body;

        const payload = {
            "userBeLiked.email": emailBeLiked,
            'userLiked.email': emailLiked
        }

        const data = await Favorite.findOneAndUpdate(payload, { status: true });
        res.status(200).json(response(200, `Chấp nhận lời mời kết bạn với ${data.userLiked.name}`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        const { emailBeLiked, emailLiked } = req.body;

        const payload = {
            "userBeLiked.email": emailBeLiked,
            'userLiked.email': emailLiked
        }

        await Favorite.findOneAndDelete(payload)
        res.status(200).json(response(200, "Hủy yêu cầu thành công"));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};
