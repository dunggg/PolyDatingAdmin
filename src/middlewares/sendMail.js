const nodemailer = require("nodemailer");
const info = require('../config/info');
const { response } = require("../utils/utils");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: info.user,
        pass: info.pass
    }
});

const sendMailRequestCode = async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Poly Dating" <quannhph11150@fpt.edu.vn>', // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu gửi mã xác nhận", // Subject line
            html: `<p>Mã xác nhận: ${req.decoded.codeRandom}</p>
                  <img src="https://f18-zpg.zdn.vn/6378515596215431194/7160a5fe91ec5ab203fd.jpg"> `, // html body
        });

        res.status(200).json(response(200, "Yêu cầu gửi mã xác nhận thành công"));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

module.exports = { sendMailRequestCode };