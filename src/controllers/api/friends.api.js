const Friend = require('../../models/friend.schema');
const Favorite = require('../../models/favorite.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const { email } = req.params;

        const data = await Friend.find({ myEmail: email });

        const payload = {
            total: data.length,
            friends: data
        }

        res.status(200).json(response(200, `Lấy danh sách bạn bè của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.insert = async (req, res) => {
    try {
        const { myEmail, emailFriends } = req.body;

        const dataMyUser = await User.findOne({ email: myEmail });
        const dataUser = await User.findOne({ email: emailFriends });

        const option = {
            myEmail: myEmail,
            friends: dataUser,
            createdAt: req.getTime,
        }

        const option2 = {
            myEmail: emailFriends,
            friends: dataMyUser,
            createdAt: req.getTime,
        }

        const optionDelete = {
            'userBeLiked.email': myEmail,
            'userLiked.email': emailFriends
        }

        await Friend.create(option);
        await Friend.create(option2);
        await Favorite.deleteOne(optionDelete);

        res.status(200).json(response(200, `Chấp nhận kết bạn với ${dataUser.name}`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        const { myEmail, emailFriends } = req.body;

        const option = {
            myEmail: myEmail,
            'friends.email': emailFriends
        }

        const option2 = {
            myEmail: emailFriends,
            'friends.email': myEmail
        }

        const data = await User.findOne({ email: emailFriends });
        await Friend.deleteOne(option);
        await Friend.deleteOne(option2);

        res.status(200).json(response(200, `Xóa ${data.name} khỏi danh sách bạn bè`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};