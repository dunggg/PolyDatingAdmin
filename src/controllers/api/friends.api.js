const Friend = require('../../models/friend.schema');
const User = require('../../models/user.schema');
const { response } = require("../../utils/utils");

exports.insert = async (req, res) => {
    try {
        const { myEmail, emailFriends } = req.body;

        // Data của bản thân (Friend)
        const dataMyUserFriend = await Friend.findOne({ myEmail });
        // Data của người gửi lời kết bạn (Friend)
        const dataUserFriend = await Friend.findOne({ myEmail: emailFriends });
        // Data của bản thân (User)
        const dataMyUser = await User.findOne({ email: myEmail });
        // Data của người gửi lời kết bạn (User)
        const dataUser = await User.findOne({ email: emailFriends });

        // Data của user gửi kết bạn, thời gian tạo
        const obj = {
            data: dataUser,
            createdDate: req.getTime,
        }

        // Data của bản thân, thời gian tạo
        const obj2 = {
            data: dataMyUser,
            createdDate: req.getTime,
        }

        const option = {
            myEmail: myEmail,
            friends: obj,
        }

        const option2 = {
            myEmail: emailFriends,
            friends: obj2,
        }

        // Nếu A và B tồn tại trong DB thì cả 2 sẽ thêm bạn bè
        if (dataMyUserFriend && dataUserFriend) {

            const myFriends = dataMyUserFriend.friends;
            const userFriends = dataUserFriend.friends;

            myFriends.push(obj);
            userFriends.push(obj2);

            await Friend.updateOne({ myEmail: myEmail }, { friends: myFriends });
            await Friend.updateOne({ myEmail: emailFriends }, { friends: userFriends });

            res.status(200).json(response(200, `Chấp nhận kết bạn với ${dataUser.name}`));
        }

        // Nếu A tồn tại, B không tồn tại trong DB thì A sẽ cập nhật thêm B vào bạn bè
        // Và B sẽ khởi tạo trong DB có bạn là A
        else if (dataMyUserFriend) {

            const myFriends2 = dataMyUserFriend.friends;
            myFriends2.push(obj);

            await Friend.updateOne({ myEmail: myEmail }, { friends: myFriends2 });
            await Friend.create(option2);

            res.status(200).json(response(200, `Chấp nhận kết bạn với ${dataUser.name}`));
        }

        // Nếu A và B không tồn tại trong DB thì thực hiện insert
        else {
            await Friend.create(option);
            await Friend.create(option2);
            res.status(200).json(response(200, `Chấp nhận kết bạn với ${dataUser.name}`));
        }
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};