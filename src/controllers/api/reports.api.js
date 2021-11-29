const Report = require('../../models/report.schema');
const { response, insertReport } = require("../../utils/utils");

exports.insert = async (req, res) => {
    try {
        const { error, value } = insertReport.validate(req.body);
        if (error) return res.status(400).json(response(400, error.message));

        let images;

        if (req.files) {
            images = `public/data-image/${req.files[0].filename}`
        }

        const payload = {
            emailReport: value.emailReport,
            emailReported: value.emailReported,
            title: value.title,
            content: value.content,
            images,
            createdAt: new Date(),
        }

        await Report.create(payload)
        res.status(200).json(response(200, `Gửi báo cáo thành công`))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};