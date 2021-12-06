const Friends = require('../../models/friends.schema');
const Users = require('../../models/users.schema');
const { response } = require("../../utils/utils");

// Danh sách yêu cầu kết bạn
exports.listFriendsRequests = async (req, res) => {
    try {
        const { email } = req.params;

        const dataFriend = await Friends.find({ myEmail: email, status: false });

        const payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách bạn bè của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách lời mời kết bạn đã gửi
exports.listOfRequestsSent = async (req, res) => {
    try {
        const { email } = req.params;

        const dataFriend = await Friends.find({ "friend.email": email, status: false });

        const payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách bạn bè của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách bạn bè
exports.listFriends = async (req, res) => {
    try {
        const { email } = req.params;

        const dataFriend = await Friends.find({ myEmail: email, status: true });

        const payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách bạn bè của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Yêu cầu kết bạn
exports.insert = async (req, res) => {
    try {
        const { myEmail, emailFriend } = req.body;

        const dataMyEmail = await Users.findOne({ email: myEmail });
        const dataEmailFriend = await Users.findOne({ email: emailFriend });
        const a = await Friends.findOne({ myEmail, "friend.email": emailFriend });

        const optionMyEmail = {
            myEmail: myEmail,
            friend: dataMyEmail,
            status: false,
            createdAt: req.getTime,
            updatedAt: req.getTime
        };

        const optionEmailFriend = {
            myEmail: emailFriend,
            friend: dataEmailFriend,
            status: false,
            createdAt: req.getTime,
            updatedAt: req.getTime
        };

        const optionUpdate = {
            status: true,
            updatedAt: req.getTime
        };

        await Friends.create(optionMyEmail);
        await Friends.create(optionEmailFriend);

        res.status(200).json(response(200, `Gửi lời kết bạn tới ${dataMyEmail.name}`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Chấp nhận kết bạn
exports.update = async (req, res) => {
    try {
        const { myEmail, emailFriend } = req.body;

        const optionUpdate = {
            status: true,
            updatedAt: req.getTime
        };

        await Friends.findOneAndUpdate({ myEmail, "friend.email": emailFriend }, optionUpdate);
        const dataFriend = await Friends.findOneAndUpdate({ myEmail: emailFriend, "friend.email": myEmail }, optionUpdate);

        res.status(200).json(response(200, `Chấp nhận lời kết bạn với `));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Xóa kết bạn, yêu cầu kết bạn, lời mời kết bạn
exports.delete = async (req, res) => {
    try {
        const { myEmail, emailFriend } = req.body;

        await Friends.findOneAndDelete({ myEmail, "friend.email": emailFriend });
        const dataFriend = await Friends.findOneAndDelete({ myEmail: emailFriend, "friend.email": myEmail });

        res.status(200).json(response(200, `Xóa ${dataFriend.friend.name} khỏi danh sách`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};