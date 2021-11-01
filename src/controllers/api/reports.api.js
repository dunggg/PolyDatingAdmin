const Report = require('../../models/report.schema');
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
    try {
        const data = await Report.find();

        res.status(200).json(response(200, "Lấy danh sách báo cáo thành công",
            { total: data.length, reports: data }))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
}

exports.insert = async (req, res) => {
    try {
        const { error, value } = validate.insertReport.validate(req.body);
        if (error) return res.status(400).json(response(400, error.message));

        const payload = {
            emailReport: value.emailReport,
            emailReported: value.emailReported,
            title: value.title,
            content: value.content,
            images: 'public/data-image/' + req.files[0].filename,
            createdAt: new Date(),
        }

        await Report.create(payload);
        res.status(201).json(response(201, "Gửi báo cáo thành công"))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
}