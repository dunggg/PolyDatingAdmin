const Master = require('../../models/master.schema');
const { response } = require('../../utils/utils');

exports.list = async (req, res) => {
    try {
        const data = await Master.findOne();

        const payload = {
            facilities: data.facilities,
            specialized: data.specialized,
            course: data.course,
            reports: data.reports,
            hobbies: data.hobbies
        }

        res.status(200).json(response(200, "Lấy dữ liệu Master thành công", payload));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};