const Emplooyee = require('../../models/employees.schema');
const { response, signIn, signUp } = require("../../utils/utils");
const info = require('../../config/info');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

exports.index = async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.signIn = async (req, res) => {
    try {
        const { error, value } = signIn.validate(req.body);

        const data = await Emplooyee.findOne({ email: value.email });

        if (value.email == 'admin' && value.password == "admin") {
            // res.redirect('/statistical');
            res.json('Đăng nhập');
        }
        else if (error) {
            // res.render('index', { msgError: error.message });
            res.json(error.message);
        }
        else if (!data) {
            // res.render('index', { msgError: 'Sai email hoặc mật khẩu' });
            res.json('Sai email hoặc mật khẩu');
        }
        else {
            const verifyPass = jwt.verify(data.password, info.hassPassKey);

            if (verifyPass != value.password) {
                // res.render('index', { msgError: 'Sai mật khẩu' });
                res.json('Sai mật khẩu');
            }
            else if (data.isActive == false) {
                // res.render('index', { msgError: 'Sai mật khẩu' });
                res.json('Tài khoản của bạn chưa được xét duyệt, vui lòng chờ đợi');
            }
            else {
                // res.redirect('/statistical');
                res.json('Đăng nhập');
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.signUp = async (req, res) => {
    try {
        const { error, value } = signUp.validate(req.body);

        if (error) {
            // res.render('index', { msgError: error.message });
            res.json(error.message);
        }
        else if (req.files.length < 1) {
            // res.render('index', { msgError: "Cần chọn ảnh" });
            res.json("Cần chọn ảnh");
        }
        else {
            const hashPass = jwt.sign(value.password, info.hassPassKey);
            const accessToken = jwt.sign(value.email, info.accessKey);

            const payload = {
                email: value.email,
                password: hashPass,
                name: value.name,
                images: pathUrl + req.files[0].filename,
                accessToken,
                isActive: false,
                createdAt: req.getTime,
                updatedAt: req.getTime
            }

            await Emplooyee.create(payload);
            // res.redirect('/');
            res.json("Đăng ký");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            // res.render('index', { msgError: "Cần nhập email" });
            res.json("Cần nhập email");
        }
        else {
            const data = await Emplooyee.findOne({ email });

            if (!data) {
                // res.render('index', { msgError: "Email không tồn tại" });
                res.json("Email không tồn tại");
            }
            else {
                const passRandom = randomString.generate(6);
                const hassPass = jwt.sign(passRandom, info.hassPassKey);

                const payload = {
                    password: hassPass,
                    updatedAt: req.getTime
                };

                await Emplooyee.updateOne({ email }, payload);

                req.decoded = {
                    email,
                    passRandom
                };
                next();
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};