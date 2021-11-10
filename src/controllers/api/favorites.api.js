const Favorite = require('../../models/favorite.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const { emailBeLiked } = req.params;

        const dataFavorite = await Favorite.find({ emailBeLiked });

        const payload = {
            total: dataFavorite.length,
            favorites: dataFavorite
        }

        res.status(200).json(response(200, `Lấy danh sách lượt thích của ${emailBeLiked} thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { emailBeLiked, emailLiked } = req.body;

        const dataBeLiked = await User.findOne({ email: emailBeLiked });
        const dataLiked = await User.findOne({ email: emailLiked });

        const userLiked = {
            email: dataLiked.email,
            name: dataLiked.name,
            images: dataLiked.images,
            hobbies: dataLiked.hobbies,
            birthDay: dataLiked.birthDay,
            gender: dataLiked.gender,
            description: dataLiked.description,
            facilities: dataLiked.facilities,
            specialized: dataLiked.specialized,
            course: dataLiked.course,
        }

        const payload = {
            emailBeLiked: dataBeLiked.email,
            userLiked,
            status: false,
            createdAt: new Date()
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
            emailBeLiked,
            'userLiked.email': emailLiked
        }

        const data = await Favorite.findOne(payload);

        await Favorite.updateOne({ _id: data._id }, { status: true })
        res.status(200).json(response(200, `Chấp nhận lời mời kết bạn với ${data.userLiked.name}`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        const { emailBeLiked, emailLiked } = req.body;

        const payload = {
            emailBeLiked,
            'userLiked.email': emailLiked
        }

        const data = await Favorite.findOne(payload);

        await Favorite.deleteOne({ _id: data._id });
        res.status(200).json(response(200, `Đã xóa ${data.userLiked.name} khỏi danh sách lời mời kết bạn.`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};