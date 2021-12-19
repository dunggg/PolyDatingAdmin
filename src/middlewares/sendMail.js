let nodemailer = require("nodemailer");
let info = require('../config/info');
let { response } = require("../utils/utils");

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: info.user,
        pass: info.pass
    }
});

let sendMailRequestCode = async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"Poly Dating" <polydatingmaster@gmail.com>`, // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu gửi mã xác nhận", // Subject line
            html: `<h3>Mã xác nhận: ${req.decoded.codeRandom}</h3>`, // html body
        });

        res.status(200).json(response(200, "Yêu cầu gửi mã xác nhận thành công"));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

let sendMailForgotPassword = async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"Poly Dating" <polydatingmaster@gmail.com>`, // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu cập nhật mật khẩu", // Subject line
            html: `<h3>Mật khẩu: ${req.decoded.passRandom}</h3>`, // html body
        });

        res.render('forgot-password', { msgSuccess: "Yêu cầu cập nhật mật khẩu thành công" });

    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { sendMailRequestCode, sendMailForgotPassword };