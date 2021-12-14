let Employees = require('../../models/employees.schema');
let Reports = require('../../models/reports.schema');
let { response, signIn, signUp } = require("../../utils/utils");
let info = require('../../config/info');
let jwt = require('jsonwebtoken');
let randomString = require('randomstring');

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

exports.index = async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        res.send(error.message);
    }
};

let role = ['Vai trò', 'Quản lý', 'Nhân viên'];
let gender = ['Giới tính', 'Nam', 'Nữ'];
let isActives = ['Trạng thái', 'Kích hoạt', 'Khóa'];

exports.list = async (req, res) => {
    try {
        let { page } = req.params;
        let { search, roleOp, genderOp, isActivesOp } = req.query;

        let pageSize = 20;
        let pageNumber = Number(page) || 1;
        let skipPage = (pageSize * pageNumber) - pageSize;

        let employees;
        let countEmployees;

        let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

        if (search || roleOp || genderOp || isActivesOp) {
            let optionFind = {
                role: { $regex: `.*${roleOp}.*` },
                gender: { $regex: `.*${genderOp}.*` },
                isActive: { $regex: `.*${isActivesOp}.*` },
                $or: [
                    { email: { $regex: `.*${search}.*`, $options: "i" } },
                    { name: { $regex: `.*${search}.*`, $options: "i" } },
                    { gender: { $regex: `.*${search}.*`, $options: "i" } },
                    { birthDay: { $regex: `.*${search}.*`, $options: "i" } },
                    { phone: { $regex: `.*${search}.*`, $options: "i" } },
                    { role: { $regex: `.*${search}.*`, $options: "i" } },
                    { isActive: { $regex: `.*${search}.*`, $options: "i" } }
                ]
            };

            employees = await Employees.find(optionFind)
                .limit(pageSize).skip(skipPage).sort({ role: -1 });

            countEmployees = await Employees.countDocuments(optionFind);
        }
        else {
            employees = await Employees.find()
                .limit(pageSize).skip(skipPage).sort({ role: -1 });

            countEmployees = await Employees.countDocuments();
        }

        let totalEmployeesPage = Math.ceil(countEmployees / pageSize);

        let countEmployeesPage = [];
        for (let index = 1; index <= totalEmployeesPage; index++) {
            countEmployeesPage.push(index);
        }

        let countFrom = pageSize * (pageNumber - 1) + 1;
        let countTo = (pageSize * pageNumber);
        let previousPage = pageNumber - 1;
        let nextPage = pageNumber + 1;

        if (countEmployees < skipPage || countEmployees < 1) {
            countFrom = 0;
            countTo = 0
        }
        else if (countEmployees < countTo) {
            countTo = countEmployees;
        }

        let paging = {
            pageNumber,
            countEmployees,
            countEmployeesPage,
            totalEmployeesPage,
            previousPage,
            nextPage,
            countFrom,
            countTo,
        };

        let payloadParams = {
            roleOp,
            genderOp,
            isActivesOp,
            search
        };

        let payload = {
            employees,
            reportsWait,
            role,
            gender,
            isActives,
            ...payloadParams,
            ...paging
        };

        res.render('employees', payload);
    } catch (error) {
        res.send(error.message);
    }
};

exports.insert = async (req, res) => {
    try {
        let { email, name, gender, birthDay, phone, role } = req.body;

        let images;
        if (req.files.length > 0) {
            images = pathUrl + req.files[0].filename;
        }

        let hashPass = jwt.sign(email + name, info.hassPassKey);
        let accessToken = jwt.sign(email, info.accessKey);

        let payload = {
            email,
            password: hashPass,
            name,
            gender,
            birthDay,
            phone,
            images,
            role,
            isActive: "Kích hoạt",
            accessToken,
            createdAt: req.getTime,
            updatedAt: req.getTime
        }

        await Employees.create(payload);
        res.redirect('/employees');

    } catch (error) {
        res.send(error.message);
    }
};

exports.block = async (req, res) => {
    try {
        let { _id, checkAction } = req.body;

        let payload = {
            isActive: "Khóa",
            updatedAt: req.getTime
        }

        let employee = await Employees.findOneAndUpdate({ _id }, payload);
        if (!employee) return res.sendStatus(404);

        if (checkAction == "1") {
            res.redirect(`/employees`);
        }
        else {
            res.redirect(`/users/${user.email}`);
        }

    } catch (error) {
        res.send(error.message);
    }
};

exports.unblock = async (req, res) => {
    try {
        let { _id, checkAction } = req.body;

        let payload = {
            isActive: "Kích hoạt",
            updatedAt: req.getTime
        }

        let employee = await Employees.findOneAndUpdate({ _id }, payload);
        if (!employee) return res.sendStatus(404);

        if (checkAction == "1") {
            res.redirect(`/employees`);
        }
        else {
            res.redirect(`/users/${user.email}`);
        }

    } catch (error) {
        res.send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        let { _id } = req.body;

        await Employees.deleteOne({ _id });
        res.redirect(`/employees`);
    } catch (error) {
        res.send(error.message);
    }
};

// exports.signIn = async (req, res) => {
//     try {
//         let { error, value } = signIn.validate(req.body);

//         let data = await Emplooyee.findOne({ email: value.email });

//         if (value.email == 'admin' && value.password == "admin") {
//             // res.redirect('/statistical');
//             res.json('Đăng nhập');
//         }
//         else if (error) {
//             // res.render('index', { msgError: error.message });
//             res.json(error.message);
//         }
//         else if (!data) {
//             // res.render('index', { msgError: 'Sai email hoặc mật khẩu' });
//             res.json('Sai email hoặc mật khẩu');
//         }
//         else {
//             let verifyPass = jwt.verify(data.password, info.hassPassKey);

//             if (verifyPass != value.password) {
//                 // res.render('index', { msgError: 'Sai mật khẩu' });
//                 res.json('Sai mật khẩu');
//             }
//             else if (data.isActive == false) {
//                 // res.render('index', { msgError: 'Sai mật khẩu' });
//                 res.json('Tài khoản của bạn chưa được xét duyệt, vui lòng chờ đợi');
//             }
//             else {
//                 // res.redirect('/statistical');
//                 res.json('Đăng nhập');
//             }
//         }
//     } catch (error) {
//         res.send(error.message);
//     }
// };

// exports.signUp = async (req, res) => {
//     try {
//         let { error, value } = signUp.validate(req.body);

//         if (error) {
//             // res.render('index', { msgError: error.message });
//             res.json(error.message);
//         }
//         else if (req.files.length < 1) {
//             // res.render('index', { msgError: "Cần chọn ảnh" });
//             res.json("Cần chọn ảnh");
//         }
//         else {
//             let hashPass = jwt.sign(value.password, info.hassPassKey);
//             let accessToken = jwt.sign(value.email, info.accessKey);

//             let payload = {
//                 email: value.email,
//                 password: hashPass,
//                 name: value.name,
//                 images: pathUrl + req.files[0].filename,
//                 accessToken,
//                 isActive: false,
//                 createdAt: req.getTime,
//                 updatedAt: req.getTime
//             }

//             await Emplooyee.create(payload);
//             // res.redirect('/');
//             res.json("Đăng ký");
//         }
//     } catch (error) {
//         res.send(error.message);
//     }
// };

// exports.forgotPassword = async (req, res, next) => {
//     try {
//         let { email } = req.body;

//         if (!email) {
//             // res.render('index', { msgError: "Cần nhập email" });
//             res.json("Cần nhập email");
//         }
//         else {
//             let data = await Emplooyee.findOne({ email });

//             if (!data) {
//                 // res.render('index', { msgError: "Email không tồn tại" });
//                 res.json("Email không tồn tại");
//             }
//             else {
//                 let passRandom = randomString.generate(6);
//                 let hassPass = jwt.sign(passRandom, info.hassPassKey);

//                 let payload = {
//                     password: hassPass,
//                     updatedAt: req.getTime
//                 };

//                 await Emplooyee.updateOne({ email }, payload);

//                 req.decoded = {
//                     email,
//                     passRandom
//                 };
//                 next();
//             }
//         }
//     } catch (error) {
//         res.send(error.message);
//     }
// };