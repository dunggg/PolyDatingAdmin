let Friends = require('../../models/friends.schema');
let Users = require('../../models/users.schema');
let { response } = require("../../utils/utils");

// Danh sách yêu cầu kết bạn
exports.listFriendsRequests = async (req, res) => {
    try {
        let currentUser = req.currentUser;

        let optionFind = {
            "friend.email": currentUser.email,
            status: false
        }

        let dataFriend = await Friends.find(optionFind);

        let payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách yêu cầu kết bạn của ${currentUser.name}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách lời mời kết bạn đã gửi
exports.listOfRequestsSent = async (req, res) => {
    try {
        let currentUser = req.currentUser;

        let optionFind = {
            "myUser.email": currentUser.email,
            status: false
        }

        let dataFriend = await Friends.find(optionFind);

        let payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách lời mời kết bạn đã gửi của ${currentUser.name}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Danh sách bạn bè
exports.listFriends = async (req, res) => {
    try {
        let currentUser = req.currentUser;

        let optionFind = {
            "friend.email": currentUser.email,
            status: true
        }

        let dataFriend = await Friends.find(optionFind);

        let payload = {
            total: dataFriend.length,
            friends: dataFriend
        }

        res.status(200).json(response(200, `Lấy danh sách bạn bè của ${currentUser.name}`, payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Yêu cầu kết bạn, chấp nhận kết bạn
exports.friendRequest = async (req, res, next) => {
    try {
        let { emailFriend } = req.body;
        let currentUser = req.currentUser;

        let optionFindOneMyUser = {
            "myUser.email": currentUser.email,
            "friend.email": emailFriend
        }

        let optionFindOneMyFriend = {
            "myUser.email": emailFriend,
            "friend.email": currentUser.email
        }

        let optionUpdate = {
            status: true,
            updatedAt: req.getTime
        };

        let dataMyUser = req.currentUser;
        let dataMyFriend = await Users.findOne({ email: emailFriend });
        let dataMyEmail = await Friends.findOne(optionFindOneMyUser);
        let dataMyEmailFriend = await Friends.findOne(optionFindOneMyFriend);

        let optionMyUser = {
            myUser: dataMyUser,
            friend: dataMyFriend,
            status: false,
            createdAt: req.getTime,
            updatedAt: req.getTime
        };

        // Nếu A kết bạn B, chỉ được gửi 1 lần. Nếu đã là bạn bè thì không được gửi.
        if (dataMyEmail) {
            if (dataMyEmail.status == true) {
                return res.status(400).json(response(400, `Bạn và ${dataMyFriend.name} đã là bạn bè`));
            }
            res.status(400).json(response(400, `Đã gửi lời kết bạn tới ${dataMyFriend.name}, vui lòng chờ đợi`));
        }

        // Nếu B chấp nhận lời kết bạn thì A và B là bạn bè
        else if (dataMyEmailFriend) {
            await Friends.create(optionMyUser);
            await Friends.updateOne(optionFindOneMyUser, optionUpdate);
            await Friends.updateOne(optionFindOneMyFriend, optionUpdate);

            req.notifiData = {
                emailSender: dataMyUser.email,
                emailReceiver: dataMyFriend.email,
                content: `${dataMyUser.name} đã chấp nhận lời mời kết bạn của bạn`,
                message: `Chấp nhận lời mời kết bạn của ${dataMyFriend.name}`,
            }
            next();
        }

        // A gửi lời kết bạn tới B
        else {
            await Friends.create(optionMyUser);

            req.notifiData = {
                emailSender: dataMyUser.email,
                emailReceiver: dataMyFriend.email,
                content: `${dataMyUser.name} đã gửi lời mời kết bạn tới bạn`,
                message: `Gửi lời mời kết bạn tới ${dataMyFriend.name}`,
            }
            next();
        }

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

// Xóa kết bạn, yêu cầu kết bạn, lời mời kết bạn
exports.delete = async (req, res) => {
    try {
        let { emailFriend } = req.body;
        let currentUser = req.currentUser;

        let optionFindOneMyUser = {
            "myUser.email": currentUser.email,
            "friend.email": emailFriend
        }

        let optionFindOneMyFriend = {
            "myUser.email": emailFriend,
            "friend.email": currentUser.email
        }

        await Friends.deleteOne(optionFindOneMyUser);
        await Friends.deleteOne(optionFindOneMyFriend);

        res.status(200).json(response(200, `Yêu cầu xóa thành công`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};