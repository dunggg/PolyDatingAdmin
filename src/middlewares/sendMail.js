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
            from: '"Poly Dating" <quannhph11150@fpt.edu.vn>', // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu gửi mã xác nhận", // Subject line
            html: `<h3>Mã xác nhận: ${req.decoded.codeRandom}</h3>
                  <img src="https://f18-zpg.zdn.vn/6378515596215431194/7160a5fe91ec5ab203fd.jpg"> `, // html body
        });

        res.status(200).json(response(200, "Yêu cầu gửi mã xác nhận thành công"));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

let sendMailForgotPassword = async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Poly Dating" <quannhph11150@fpt.edu.vn>', // sender address
            to: `${req.decoded.email}`, // list of receivers
            subject: "Yêu cầu quên mật khẩu", // Subject line
            html: `<h3>Mật khẩu: ${req.decoded.passRandom}</h3>
                  <img src="https://f42-zpg.zdn.vn/6960682428680983532/966d3fa482ad49f310bc.jpg"> `, // html body
        });

        // res.render('index', { msgError: "Yêu cầu quên mật khẩu thành công" });
        res.json("Yêu cầu quên mật khẩu thành công")

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { sendMailRequestCode, sendMailForgotPassword };