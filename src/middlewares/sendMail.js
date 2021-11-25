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
            to: `duyenntph11506@fpt.edu.vn
            ,dungdtph11139@fpt.edu.vn
            ,hoadtph08392@fpt.edu.vn
            ,huypcph11075@fpt.edu.vn
            ,thangdcph09752@fpt.edu.vn
            ,thangbcph11219@fpt.edu.vn`, // list of receivers
            subject: "Chào mừng bạn đã tham gia Poly Dating", // Subject line
            html: `<h3>Vui lòng đổi mật khẩu lần đầu tiên!</h3> 
                  <p>Mật khẩu: ${req.passRandom}</p>
                  <img src="https://f42-zpg.zdn.vn/6960682428680983532/966d3fa482ad49f310bc.jpg"> `, // html body
        });

        res.status(201).json(response(201, "Tạo tài khoản thành công"))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
}

module.exports = { sendMailNewUser }