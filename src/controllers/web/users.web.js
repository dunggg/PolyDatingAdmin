let Masters = require('../../models/masters.schema');
let Users = require("../../models/users.schema");
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');
let info = require('../../config/info');
let jwt = require('jsonwebtoken');
let _ = require('lodash');
let moment = require('moment');

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

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
//     let perPage = 20;
//     let page = Number(req.params.page) || 1;
//     let listUser = await Users.find(search)
//       .skip(perPage * page - perPage)
//       .limit(perPage).sort({ createdAt: -1 });
//     let countDoc = await Users.countDocuments(search);
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
//     let masters = await Masters.findOne();
//     let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

//     let payload = {
//       users: listUser,
//       reportsWait,
//       arrPage,
//       countTo: perPage * page,
//       countFrom: perPage * (page - 1) + 1,
//       page: page,
//       pre: Number(page) - 1 || arrPage.length,
//       next: Number(page) + 1 > arrPage.length ? 1 : Number(page) + 1,
//       facilities: masters.facilities,
//       specialized: masters.specialized,
//       course: masters.course,
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
//     res.render('users-clone', payload);
//   } catch (error) {
//     res.send(error.message);
//   }
// };

exports.index = async (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.send(error.message);
  }
};

let gender = ['Giới tính', 'Nam', 'Nữ'];
let isActives = ['Trạng thái', 'Kích hoạt', 'Khóa'];
let role = ['Vai trò', 'Quản trị viên', 'Người dùng'];

exports.list = async (req, res) => {
  try {
    let { page } = req.params;
    let { search,
      facilitiesOp,
      specializedOp,
      courseOp,
      genderOp,
      isActivesOp,
      roleOp
    } = req.query;

    let pageSize = 20;
    let pageNumber = Number(page) || 1;
    let skipPage = (pageSize * pageNumber) - pageSize;

    let users;
    let countUsers;

    let masters = await Masters.findOne();
    let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

    if (search || facilitiesOp || specializedOp || courseOp || genderOp || isActivesOp || roleOp) {
      if (roleOp == 'Quản trị viên') {
        let optionFind = {
          gender: { $regex: `.*${genderOp}.*` },
          isActive: { $regex: `.*${isActivesOp}.*` },
          role: { $regex: `.*${roleOp}.*` },
          $or: [
            { email: { $regex: `.*${search}.*`, $options: "i" } },
            { name: { $regex: `.*${search}.*`, $options: "i" } },
            { gender: { $regex: `.*${search}.*`, $options: "i" } },
            { birthDay: { $regex: `.*${search}.*`, $options: "i" } },
            { phone: { $regex: `.*${search}.*`, $options: "i" } },
            { isActive: { $regex: `.*${search}.*`, $options: "i" } },
            { role: { $regex: `.*${search}.*`, $options: "i" } }
          ]
        };

        users = await Users.find(optionFind)
          .limit(pageSize).skip(skipPage).sort({ role: -1 });

        countUsers = await Users.countDocuments(optionFind);
      }
      else {
        let optionFind = {
          facilities: { $regex: `.*${facilitiesOp}.*` },
          specialized: { $regex: `.*${specializedOp}.*` },
          course: { $regex: `.*${courseOp}.*` },
          gender: { $regex: `.*${genderOp}.*` },
          isActive: { $regex: `.*${isActivesOp}.*` },
          role: { $regex: `.*${roleOp}.*` },
          $or: [
            { email: { $regex: `.*${search}.*`, $options: "i" } },
            { name: { $regex: `.*${search}.*`, $options: "i" } },
            { hobbies: { $regex: `.*${search}.*`, $options: "i" } },
            { gender: { $regex: `.*${search}.*`, $options: "i" } },
            { birthDay: { $regex: `.*${search}.*`, $options: "i" } },
            { phone: { $regex: `.*${search}.*`, $options: "i" } },
            { description: { $regex: `.*${search}.*`, $options: "i" } },
            { facilities: { $regex: `.*${search}.*`, $options: "i" } },
            { specialized: { $regex: `.*${search}.*`, $options: "i" } },
            { course: { $regex: `.*${search}.*`, $options: "i" } },
            { isActive: { $regex: `.*${search}.*`, $options: "i" } },
            { role: { $regex: `.*${search}.*`, $options: "i" } }
          ]
        };

        users = await Users.find(optionFind)
          .limit(pageSize).skip(skipPage).sort({ role: -1 });

        countUsers = await Users.countDocuments(optionFind);
      }
    }
    else {
      users = await Users.find()
        .limit(pageSize).skip(skipPage).sort({ role: -1 });

      countUsers = await Users.countDocuments();
    }

    let totalUsersPage = Math.ceil(countUsers / pageSize);

    let countUsersPage = [];
    for (let index = 1; index <= totalUsersPage; index++) {
      countUsersPage.push(index);
    }

    let countFrom = pageSize * (pageNumber - 1) + 1;
    let countTo = (pageSize * pageNumber);
    let previousPage = pageNumber - 1;
    let nextPage = pageNumber + 1;

    if (countUsers < skipPage || countUsers < 1) {
      countFrom = 0;
      countTo = 0
    }
    else if (countUsers < countTo) {
      countTo = countUsers;
    }

    let paging = {
      pageNumber,
      countUsers,
      countUsersPage,
      totalUsersPage,
      previousPage,
      nextPage,
      countFrom,
      countTo,
    };

    let payloadMasters = {
      facilities: masters.facilities,
      specialized: masters.specialized,
      course: masters.course,
      gender,
      isActives,
      role
    };

    let payloadParams = {
      facilitiesOp,
      specializedOp,
      courseOp,
      genderOp,
      isActivesOp,
      roleOp,
      search
    };

    let payload = {
      users,
      reportsWait,
      ...payloadMasters,
      ...payloadParams,
      ...paging
    };

    res.render('users', payload);
  } catch (error) {
    res.send(error.message);
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
    res.send(error.message);
  }
};

exports.insert = async (req, res) => {
  try {
    let { email, name, gender, birthDay, phone } = req.body;

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
      images,
      hobbies: null,
      gender,
      birthDay,
      phone,
      description: null,
      facilities: null,
      specialized: null,
      course: null,
      isShow: null,
      isActive: "Kích hoạt",
      role: 'Quản trị viên',
      statusHobby: false,
      reportNumber: 0,
      code: null,
      accessToken,
      notificationToken: null,
      createdAt: req.getTime,
      updatedAt: req.getTime
    }

    await Users.create(payload);
    res.redirect('/users');

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

    let user = await Users.findOneAndUpdate({ _id }, payload);
    if (!user) return res.sendStatus(404);

    if (checkAction == "1") {
      res.redirect(`/users`);
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
      reportNumber: 0,
      isActive: "Kích hoạt",
      updatedAt: req.getTime
    }

    let user = await Users.findOneAndUpdate({ _id }, payload);
    if (!user) return res.sendStatus(404);

    if (checkAction == "1") {
      res.redirect(`/users`);
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
    let data = await Users.findOne({ _id });

    await Friends.deleteMany({ 'myUser.email': data.email });
    await Friends.deleteMany({ 'friends.email': data.email });
    await Notifications.deleteMany({ emailSender: data.email });
    await Notifications.deleteMany({ emailReceiver: data.email });
    await Reports.deleteMany({ emailSender: data.email });
    await Reports.deleteMany({ emailReceiver: data.email });
    await Users.deleteOne({ _id: data._id });

    res.redirect(`/users`);
  } catch (error) {
    res.send(error.message);
  }
};
