const Nofitications = require('../../models/notifications.schema');
const { response } = require("../../utils/utils");

exports.list = async (req, res) => {
    try {
        const { email } = req.params;

        const option = {
            'emailReceiver.email': email,
            'emailReceiver.status': true
        };

        const data = await Nofitications.find(option);

        const dataCheckSatus = [];

        for (let index = 0; index < data.length; index++) {
            const pos = data[index].emailReceiver;

            for (let j = 0; j < pos.length; j++) {

                if (pos[j].email == email && pos[j].status == true) {
                    dataCheckSatus.push(data[index]);
                    break;
                }
            }
        }

        const payload = {
            total: dataCheckSatus.length,
            nofitications: dataCheckSatus
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

        const data = await Nofitications.findOne(optionFindOne);

        let emailReceiver = data.emailReceiver;

        let index = emailReceiver.map((v) => {
            return v.email;
        }).indexOf(email);

        emailReceiver[index].status = false;

        await Nofitications.updateMany(optionFindOne, { emailReceiver });
        res.status(200).json(response(200, `Xóa thông báo thành công`));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};