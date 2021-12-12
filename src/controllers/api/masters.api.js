let Masters = require('../../models/masters.schema');
let { response } = require('../../utils/utils');

exports.list = async (req, res) => {
    try {
        let data = await Masters.findOne();

        let payload = {
            facilities: data.facilities,
            specialized: data.specialized,
            course: data.course,
            reports: data.reports,
            hobbies: data.hobbies
        }

        res.status(200).json(response(200, "Pass", "Lấy dữ liệu Master thành công", payload));

    } catch (error) {
        res.status(500).json(response(500, "Error", error.message));
    }
};