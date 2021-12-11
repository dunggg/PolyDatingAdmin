const Users = require('../../models/users.schema');
const Reports = require('../../models/reports.schema');
const Masters = require('../../models/masters.schema');
const _ = require('lodash');
const moment = require('moment');

// exports.list = async (req, res) => {
//   let isSearch = false;
//   var search = {};
//   if (!_.isEmpty(req.query)) {
//     var {
//       specialized: specializedParams,
//       course: courseParams,
//       gender: genderParams,
//       report: reportParmas,
//       status: statusParams,
//       facilities: facilitiesParams,
//       email: searchParams,
//     } = req.query;
//     for (const key in req.query) {
//       if (key != null) {
//         search[`${key}`] = req.query[`${key}`];
//       }
//     }
//     isSearch = true;
//   }
//   try {
//     let perPage = 2;
//     let page = Number(req.params.page) || 1;
//     const listUser = await User.find(search)
//       .skip(perPage * page - perPage)
//       .limit(perPage);
//     const countDoc = await User.countDocuments(search);
//     const countPage = Math.ceil(countDoc / perPage);
//     const arrPage = [];
//     // nếu tổng countPage - page >= 5
//     if (countPage - page >= 5) {
//       // nếu page - 1 khác 0 render từ page -1
//       if (page - 1) {
//         for (let i = page - 1; i <= page + 3; i++) {
//           arrPage.push(i);
//         }
//       } else {
//         // nếu page lớn hơn 1
//         for (let i = page; i <= page + 4; i++) {
//           arrPage.push(i);
//         }
//       }
//     } else {
//       // render 5 page cuối
//       if (countPage >= 5) {
//         const pageRest = countPage - page;
//         for (let i = page - (5 - pageRest); i <= page + pageRest; i++) {
//           arrPage.push(i);
//         }
//       } else {
//         for (let i = 1; i <= countPage; i++) {
//           arrPage.push(i);
//         }
//       }
//     }
//     let payload = {
//       users: listUser,
//       arrPage,
//       countTo: perPage * page,
//       countFrom: perPage * (page - 1) + 1,
//       page: page,
//       pre: Number(page) - 1 || arrPage.length,
//       next: Number(page) + 1 > arrPage.length ? 1 : Number(page) + 1,
//       course,
//       specialized,
//       facilities,
//       isSearch,
//       buttonFirt: page > 1 ? true : false,
//       buttonLast: page !== countPage ? true : false,
//       countPage,
//       timeStamp: moment().unix(),
//     };
//     if (!_.isEmpty(req.query)) {
//       payload = {
//         ...payload,
//         specializedParams,
//         courseParams,
//         genderParams,
//         reportParmas,
//         statusParams,
//         facilitiesParams,
//         searchParams,
//       };
//     }
//     res.render('users', payload);
//   } catch (error) {
//     res.status(500).send(500, error.message);
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email == 'admin' && password == 'admin')
//       return res.redirect('/statistical?format=0&timeStamp=' + moment().unix());

//     const data = await User.findOne({ email, password });

//     if (!data)
//       return res.render('index', { msgError: 'Sai email hoặc mật khẩu' });

//     if (data.role != 'Admin')
//       return res.render('index', { msgError: 'Tài khoản không có quyền hạn' });

//     if (data.isActive != 'Kích hoạt')
//       return res.render('index', { msgError: 'Tài khoản đã bị khóa' });

//     res.redirect('/statistical?format=0&timeStamp=' + moment().unix());
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.list = async (req, res) => {
  try {
    const users = await Users.find();
    const masters = await Masters.findOne();

    const payload = {
      users,
      facilities: masters.facilities,
      specialized: masters.specialized,
      course: masters.course
    }

    res.render('users', payload);
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.findOne = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await Users.findOne({ email });
    const reports = await Reports.find({ emailReceiver: email })

    if (!user) return res.sendStatus(404);

    const payload = {
      user,
      reports,
      totalReports: reports.length,
    };

    res.render('profile', payload);
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.block = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await Users.findByIdAndUpdate({ _id }, { isActive: false });
    if (!user) return res.sendStatus(404);

    res.redirect(`/users/${user.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.unblock = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await Users.findOne({ _id });
    if (!user) return res.sendStatus(404);

    const option = {
      reportNumber: 0,
      isActive: true
    }

    await Users.updateOne({ _id }, option);

    res.redirect(`/users/${user.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.verifyReportRequest = async (req, res) => {
  try {
    const { _idUser, _idReport, action } = req.body;

    const user = await Users.findOne({ _id: _idUser });
    if (!user) return res.sendStatus(404);

    let status;
    let reportNumber;

    if (action == "true") {
      status = "Chấp thuận";
      reportNumber = user.reportNumber + 1;
    }
    else {
      status = "Từ chối"
      reportNumber = user.reportNumber;
    }

    if (user.reportNumber > 4) {
      await Users.updateOne({ _id: _idUser }, { isActive: false });
    }
    else {
      await Users.updateOne({ _id: _idUser }, { reportNumber });
    }

    await Reports.updateOne({ _id: _idReport }, { status });

    res.redirect(`/users/${user.email}`);
  } catch (error) {
    res.status(500).send(error.message)
  }
};
