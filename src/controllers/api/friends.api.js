const Friends = require('../../models/friends.schema');
const Users = require('../../models/users.schema');
const { response } = require("../../utils/utils");

// Danh sách yêu cầu kết bạn
exports.listFriendsRequests = async (req, res) => {
    try {
        const { email } = req.params;

        const optionFind = {
            "myUser.email": email,
            status: false
        }

        const dataFriend = await Friends.find(optionFind);

        const payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách yêu cầu kết bạn của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách lời mời kết bạn đã gửi
exports.listOfRequestsSent = async (req, res) => {
    try {
        const { email } = req.params;

        const optionFind = {
            "friend.email": email,
            status: false
        }

        const dataFriend = await Friends.find(optionFind);

        const payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách lời mời kết bạn đã gửi của ${email}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách bạn bè
exports.listFriends = async (req, res) => {
    try {
        const { email } = req.params;

        const optionFind = {
            "myUser.email": email,
            status: true
        }

        const dataFriend = await Friends.find(optionFind);

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

        const optionFindOneMyUser = {
            "myUser.email": myEmail,
            "friend.email": emailFriend
        }

        const optionFindOneMyFriend = {
            "myUser.email": emailFriend,
            "friend.email": myEmail
        }

        const optionUpdate = {
            status: true,
            updatedAt: req.getTime
        };

        const dataMyUser = await Users.findOne({ email: myEmail });
        const dataMyFriend = await Users.findOne({ email: emailFriend });
        const dataMyEmail = await Friends.findOne(optionFindOneMyUser);
        const dataMyEmailFriend = await Friends.findOne(optionFindOneMyFriend);

        const optionMyUser = {
            myUser: dataMyUser,
            friend: dataMyFriend,
            status: false,
            createdAt: req.getTime,
            updatedAt: req.getTime
        };

        if (dataMyEmail) {
            if (dataMyEmail.status == true) {
                return res.status(400).json(response(400, `Bạn và ${dataMyUser.name} đã là bạn bè`));
            }

            res.status(400).json(response(400, `Đã gửi lời kết bạn tới ${dataMyUser.name}, vui lòng chờ đợi`));
        }

        else if (dataMyEmailFriend) {
            await Friends.create(optionMyUser);
            await Friends.updateOne(optionFindOneMyUser, optionUpdate);
            await Friends.updateOne(optionFindOneMyFriend, optionUpdate);

            res.status(200).json(response(200, `Chấp nhận lời kết bạn của ${dataMyUser.name}`));
        }

        else {
            await Friends.create(optionMyUser);

            res.status(200).json(response(200, `Gửi lời kết bạn tới ${dataMyUser.name}`));
        }
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Chấp nhận kết bạn
exports.update = async (req, res) => {
    try {
        const { myEmail, emailFriend } = req.body;

        const optionFindOneMyUser = {
            "myUser.email": myEmail,
            "friend.email": emailFriend
        }

        const optionFindOneMyFriend = {
            "myUser.email": emailFriend,
            "friend.email": myEmail
        }

        const dataMyUser = await Users.findOne({ email: myEmail });
        const dataMyFriend = await Users.findOne({ email: emailFriend });
        const dataMyEmailFriend = await Friends.findOne(optionFindOneMyFriend);

        const optionMyFriend = {
            myUser: dataMyFriend,
            friend: dataMyUser,
            status: true,
            createdAt: req.getTime,
            updatedAt: req.getTime
        };

        const optionUpdate = {
            status: true,
            updatedAt: req.getTime
        };

        if (dataMyEmailFriend.status == true) {
            res.status(400).json(response(400, `Bạn và ${dataMyFriend.name} đã là bạn bè`));
        }

        else {
            await Friends.create(optionMyFriend);
            await Friends.updateOne(optionFindOneMyUser, optionUpdate);

            res.status(200).json(response(200, `Chấp nhận lời kết bạn với ${dataMyFriend.name}`));
        }
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Xóa kết bạn, yêu cầu kết bạn, lời mời kết bạn
exports.delete = async (req, res) => {
    try {
        const { myEmail, emailFriend } = req.body;

        const optionFindOneMyUser = {
            "myUser.email": myEmail,
            "friend.email": emailFriend
        }

        const optionFindOneMyFriend = {
            "myUser.email": emailFriend,
            "friend.email": myEmail
        }

        await Friends.deleteOne(optionFindOneMyUser);
        const dataFriend = await Friends.findOneAndDelete(optionFindOneMyFriend);

        res.status(200).json(response(200, `Xóa ${dataFriend.myUser.name} khỏi danh sách`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};