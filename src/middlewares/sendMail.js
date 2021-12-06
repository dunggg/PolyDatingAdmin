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

const sendMailNewUser = async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Poly Dating" <quannhph11150@fpt.edu.vn>', // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Chào mừng bạn đã tham gia Poly Dating", // Subject line
            html: `<h3>Vui lòng đổi mật khẩu lần đầu tiên!</h3> 
                  <p>Mật khẩu: ${req.decoded.passRandom}</p>
                  <img src="https://f42-zpg.zdn.vn/6960682428680983532/966d3fa482ad49f310bc.jpg"> `, // html body
        });

        res.status(201).json(response(201, "Tạo tài khoản thành công"))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

const sendMailForgotPassword = async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Poly Dating" <quannhph11150@fpt.edu.vn>', // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu cập nhật mật khẩu mới", // Subject line
            html: `<h3>Đây là mật khẩu mới!</h3> 
                  <p>Mật khẩu mới: ${req.decoded.passRandom}</p>
                  <img src="https://f18-zpg.zdn.vn/6378515596215431194/7160a5fe91ec5ab203fd.jpg"> `, // html body
        });

        res.status(200).json(response(200, "Yêu cầu cập nhật mật khẩu thành công"));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

module.exports = { sendMailNewUser, sendMailForgotPassword };