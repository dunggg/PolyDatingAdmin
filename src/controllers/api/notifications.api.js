const Nofitications = require('../../models/notifications.schema');
const { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const { email } = req.params;

        const data = await Nofitications.find({ 'emailReceiver.email': email });

        const payload = {
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
        const { email, randomKey } = req.body;

        const optionFindOne = {
            'emailReceiver.email': email,
            randomKey
        }

        await Nofitications.deleteOne(optionFindOne);
        res.status(200).json(response(200, `Xóa thông báo thành công`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};