let Masters = require('../../models/masters.schema');
let Users = require("../../models/users.schema");
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');
let Tokens = require('../../models/tokens.schema');
let _ = require('lodash');
let moment = require('moment');

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
//     for (let key in req.query) {
//       if (key != null) {
//         search[`${key}`] = req.query[`${key}`];
//       }
//     }
//     isSearch = true;
//   }
//   try {
//     let perPage = 2;
//     let page = Number(req.params.page) || 1;
//     let listUser = await User.find(search)
//       .skip(perPage * page - perPage)
//       .limit(perPage);
//     let countDoc = await User.countDocuments(search);
//     let countPage = Math.ceil(countDoc / perPage);
//     let arrPage = [];
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
//         let pageRest = countPage - page;
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
// res.send(error.message);
//   }
// };

exports.list = async (req, res) => {
  try {
    let users = await Users.find();
    let masters = await Masters.findOne();

    let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

    let payload = {
      users,
      facilities: masters.facilities,
      specialized: masters.specialized,
      course: masters.course,
      reportsWait
    }

    res.render('users', payload);
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.findOne = async (req, res) => {
  try {
    let { email } = req.params;

    let user = await Users.findOne({ email });
    if (!user) return res.sendStatus(404);

    let optionFind = {
      "friend.email": email,
      status: true
    }

    let countFriends = await Friends.countDocuments(optionFind);
    let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

    let payload = {
      user,
      countFriends,
      reportsWait
    };

    res.render('profile', payload);
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.block = async (req, res) => {
  try {
    let { _id } = req.body;

    const payload = {
      isActive: false,
      updatedAt: req.getTime
    }

    let user = await Users.findByIdAndUpdate({ _id }, payload);
    if (!user) return res.sendStatus(404);

    res.redirect(`/users/${user.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.unblock = async (req, res) => {
  try {
    let { _id } = req.body;

    let user = await Users.findOne({ _id });
    if (!user) return res.sendStatus(404);

    let option = {
      reportNumber: 0,
      isActive: true,
      updatedAt: req.getTime
    }

    await Users.updateOne({ _id }, option);

    res.redirect(`/users/${user.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let { _id } = req.body;

    let data = await Users.findOne({ _id });

    await Friends.deleteMany({ 'myUser.email': data.email });
    await Friends.deleteMany({ 'friends.email': data.email });
    await Notifications.deleteMany({ emailSender: data.email });
    await Notifications.deleteMany({ emailReceiver: data.email });
    await Reports.deleteMany({ emailReceiver: data.email });
    await Tokens.deleteOne({ email: data.email });
    await Users.deleteOne({ _id: data._id });

    res.redirect(`/users`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
