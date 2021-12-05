const Favorite = require('../../models/favorite.schema');
const Friend = require('../../models/friend.schema');
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

        const dataBeLiked = await User.findOne({ email: emailBeLiked }); //Người được kết bạn A
        const dataLiked = await User.findOne({ email: emailLiked }); //Người gửi kết bạn B

        const option = {
            'userBeLiked.email': emailBeLiked, //A
            'userLiked.email': emailLiked //B
        }

        const option2 = {
            'userBeLiked.email': emailLiked, //B
            'userLiked.email': emailBeLiked //A
        }

        const userLike = await Favorite.findOne(option);
        const userBeLike = await Favorite.findOne(option2);

        // B gửi lời kết bạn cho A, chỉ yêu cầu 1 lần
        if (userLike) {
            res.status(400).json(response(400, `Bạn đã gửi lời mời tới ${dataBeLiked.name}, vui lòng chờ đợi`));
        }

        // Nếu A nhận lời mời kết bạn của B mà chưa chấp nhận
        // A kết bạn ở màn home thay vì chấp nhận ở màn bạn bè
        // Thì A sẽ kết bạn với B thay vì gửi lời kết bạn
        else if (userBeLike) {

            const obj = {
                myEmail: emailBeLiked,
                friends: dataLiked,
                createdAt: req.getTime,
            }

            const obj2 = {
                myEmail: emailLiked,
                friends: dataBeLiked,
                createdAt: req.getTime,
            }

            await Friend.create(obj);
            await Friend.create(obj2);
            await Favorite.deleteOne(option2);

            res.status(200).json(response(200, `Chấp nhận lời kết bạn với ${dataLiked.name}`));
        }

        else {
            const payload = {
                userBeLiked: dataBeLiked,
                userLiked: dataLiked,
                createdAt: req.getTime
            }

            await Favorite.create(payload);
            res.status(200).json(response(200, `Yêu thích ${dataBeLiked.name}`, payload));
        }
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
