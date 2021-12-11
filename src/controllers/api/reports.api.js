const Reports = require('../../models/reports.schema');
const { response, insertReport } = require("../../utils/utils");

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

exports.insert = async (req, res) => {
    try {
        const { error, value } = insertReport.validate(req.body);
        if (error) {
            res.status(400).json(response(400, error.message));
        }
        else {
            let images = [];
            if (req.files.length > 0) {
                images = pathUrl + req.files[0].filename;
            }

            const payload = {
                emailReceiver: value.emailReport,
                emailSender: value.emailReported,
                title: value.title,
                content: value.content,
                images,
                createdAt: req.getTime,
                updatedAt: req.getTime
            }

            await Reports.create(payload)
            res.status(200).json(response(200, `Gửi báo cáo thành công`))
        }
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};
