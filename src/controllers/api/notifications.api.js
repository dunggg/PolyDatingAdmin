let Nofitications = require('../../models/notifications.schema');
let { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        let data = await Nofitications.find({ 'emailReceiver.email': req.currentUser.email });

        let payload = {
            total: data.length,
            nofitications: data
        };

        res.status(200).json(response(200, `Lấy danh sách thông báo thành công`, payload));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

exports.delete = async (req, res) => {
    try {
        let { _id } = req.body;

        let payload = {
            _id,
            'emailReceiver.email': req.currentUser.email
        }

        await Nofitications.deleteOne(payload);
        res.status(200).json(response(200, `Xóa thông báo thành công`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};