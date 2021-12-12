let Nofitications = require('../../models/notifications.schema');
let { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        let data = await Nofitications.find({ 'emailReceiver.email': req.currentUser.email });

        let payload = {
            total: data.length,
            nofitications: data
        };

        res.status(200).json(response(200, "Pass", `Lấy danh sách thông báo thành công`, payload));

    } catch (error) {
        res.status(500).json(response(500, "Error", error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        await Nofitications.deleteOne({ 'emailReceiver.email': req.currentUser.email, });
        res.status(200).json(response(200, "Pass", `Xóa thông báo thành công`));

    } catch (error) {
        res.status(500).json(response(500, "Error", error.message));
    }
};