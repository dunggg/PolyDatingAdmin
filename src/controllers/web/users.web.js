let Masters = require('../../models/masters.schema');
let Users = require('../../models/users.schema');
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');
let info = require('../../config/info');
let jwt = require('jsonwebtoken');
let randomString = require('randomstring');
let moment = require('moment');
let _ = require('lodash');

let pathUrl = 'https://poly-dating.herokuapp.com/public/data_images/';

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

exports.getFileApk = async (req, res) => {
  try {
    res.download('src/public/files/poly-dating.apk');
  } catch (error) {
    res.send(error.message);
  }
};

exports.index = async (req, res) => {
  try {
    if (req.cookies.token) {
      return res.redirect('statistical?format=0&timeStamp=' + moment().unix());
    }
    res.render('index');

  } catch (error) {
    res.send(error.message);
  }
};

exports.screenForgotPassword = async (req, res) => {
  try {
    res.render('forgot-password');
  } catch (error) {
    res.send(error.message);
  }
};

exports.logOut = async (req, res) => {
  try {
    if (req.cookies.token) {
      res.clearCookie('token');
    }
    res.redirect('/');
  } catch (error) {
    res.send(error.message);
  }
};

exports.logIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await Users.findOne({ email, role: 'Quản trị viên' });

    if (!user) {
      return res.render('index', { msgError: 'Sai email hoặc mật khẩu' });
    }

    let verifyPass = jwt.verify(user.password, info.hassPassKey);

    if (password != verifyPass) {
      return res.render('index', { msgError: 'Sai mật khẩu' });
    }

    //Set cookie trong thời gian 1 ngày
    res.cookie("token", user.accessToken, { maxAge: 1000 * 60 * 60 * 24 });

    res.redirect('statistical?format=0&timeStamp=' + moment().unix());

  } catch (error) {
    res.send(error.message);
  }
};

exports.insert = async (req, res) => {
  try {
    let { email, name, gender, birthDay, phone } = req.body;

    let images = [];
    if (req.files.length > 0) {
      images.push(pathUrl + req.files[0].filename);
    }

    let hashPass = jwt.sign(email + phone, info.hassPassKey);
    let accessToken = jwt.sign(email, info.accessKey);

    let payload = {
      email,
      password: hashPass,
      name,
      images,
      hobbies: '',
      gender,
      birthDay,
      phone,
      description: '',
      facilities: '',
      specialized: '',
      course: '',
      isShow: '',
      isActive: 'Kích hoạt',
      role: 'Quản trị viên',
      statusHobby: false,
      reportNumber: 0,
      code: "",
      accessToken,
      notificationToken: "",
      createdAt: req.getTime,
      updatedAt: req.getTime,
    };

    await Users.create(payload);
    res.redirect('/users');

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
    let {
      search,
      facilitiesOp,
      specializedOp,
      courseOp,
      genderOp,
      isActivesOp,
      roleOp,
    } = req.query;

    let pageSize = 20;
    let pageNumber = Number(page) || 1;
    let skipPage = pageSize * pageNumber - pageSize;

    let optionFind = {};

    if (
      search ||
      facilitiesOp ||
      specializedOp ||
      courseOp ||
      genderOp ||
      isActivesOp ||
      roleOp
    ) {
      optionFind = {
        facilities: new RegExp(`.*${facilitiesOp || ''}.*`),
        specialized: new RegExp(`.*${specializedOp || ''}.*`),
        course: new RegExp(`.*${courseOp || ''}.*`),
        gender: new RegExp(`.*${genderOp || ''}.*`),
        isActive: new RegExp(`.*${isActivesOp || ''}.*`),
        role: new RegExp(`.*${roleOp || ''}.*`),
        $or: [
          { email: new RegExp(`.*${search || ''}.*`, 'i') },
          { name: new RegExp(`.*${search || ''}.*`, 'i') },
          { hobbies: new RegExp(`.*${search || ''}.*`, 'i') },
          { gender: new RegExp(`.*${search || ''}.*`, 'i') },
          { birthDay: new RegExp(`.*${search || ''}.*`, 'i') },
          { phone: new RegExp(`.*${search || ''}.*`, 'i') },
          { facilities: new RegExp(`.*${search || ''}.*`, 'i') },
          { specialized: new RegExp(`.*${search || ''}.*`, 'i') },
          { course: new RegExp(`.*${search || ''}.*`, 'i') },
          { isActive: new RegExp(`.*${search || ''}.*`, 'i') },
          { role: new RegExp(`.*${search || ''}.*`, 'i') },
        ],
      };
    }

    let masters = await Masters.findOne();
    let reportsWait = await Reports.countDocuments({ status: 'Chờ duyệt' });

    let users = await Users.find(optionFind)
      .limit(pageSize)
      .skip(skipPage)
      .sort({ role: -1 });

    let countUsers = await Users.countDocuments(optionFind);

    let totalUsersPage = Math.ceil(countUsers / pageSize);

    let countUsersPage = [];
    for (let index = 1; index <= totalUsersPage; index++) {
      countUsersPage.push(index);
    }

    let countFrom = pageSize * (pageNumber - 1) + 1;
    let countTo = pageSize * pageNumber;
    let previousPage = pageNumber - 1;
    let nextPage = pageNumber + 1;

    if (countUsers < skipPage || countUsers < 1) {
      countFrom = 0;
      countTo = 0;
    } else if (countUsers < countTo) {
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
      role,
    };

    let payloadParams = {
      facilitiesOp,
      specializedOp,
      courseOp,
      genderOp,
      isActivesOp,
      roleOp,
      search,
    };

    for (let index = 0; index < users.length; index++) {
      users[index].index = countFrom + index;
    }

    let payload = {
      users,
      reportsWait,
      timeStamp: moment().unix(),
      currentUserWeb: req.currentUserWeb,
      ...payloadMasters,
      ...payloadParams,
      ...paging,
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
      'friend.email': email,
      status: true,
    };

    let countFriends = await Friends.countDocuments(optionFind);
    let reportsWait = await Reports.countDocuments({ status: 'Chờ duyệt' });

    let payload = {
      user,
      currentUserWeb: req.currentUserWeb,
      countFriends,
      reportsWait,
      timeStamp: moment().unix(),
    };

    res.render('profile', payload);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateInformation = async (req, res) => {
  try {
    let { _id, name, phone, birthDay, gender } = req.body;

    let user = await Users.findOne({ _id });
    let images = user.images;

    if (req.files.length > 0) {
      images.splice(0, 1);
      images.push(pathUrl + req.files[0].filename);
    }

    let payload = {
      name,
      images,
      phone,
      birthDay,
      gender,
      updatedAt: req.getTime,
    };

    await Users.updateOne({ _id }, payload);
    res.redirect(`/users/${user.email}`);

  } catch (error) {
    res.send(error.message);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    let { _id, passOld, passNew, passNew2 } = req.body;

    let user = await Users.findOne({ _id });
    let verifyPass = jwt.verify(user.password, info.hassPassKey);

    if (passOld != verifyPass) {
      res.send('Sai mật khẩu cũ');
    } else if (passNew2 != passNew) {
      res.send('Mật khẩu mới cần giống nhau');
    } else {
      let hashPass = jwt.sign(passNew, info.hassPassKey);

      let payload = {
        password: hashPass,
        updatedAt: req.getTime,
      };

      await Users.updateOne({ _id }, payload);
      res.redirect(`/users/${user.email}`);
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;

    let user = await Users.findOne({ email, role: 'Quản trị viên' });

    if (!user) {
      return res.render('forgot-password', { msgError: 'Email không tồn tại' });
    }

    let passRandom = randomString.generate(10);
    let hashPass = jwt.sign(passRandom, info.hassPassKey);

    let payload = {
      password: hashPass,
      updatedAt: req.getTime,
    };

    await Users.updateOne({ _id: user._id }, payload);

    req.decoded = {
      email,
      passRandom,
    };
    next();
  } catch (error) {
    res.send(error.message);
  }
};

exports.block = async (req, res, next) => {
  try {
    let { _id, checkAction } = req.body;

    let payload = {
      isActive: 'Khóa',
      updatedAt: req.getTime,
    };

    let user = await Users.findOneAndUpdate({ _id }, payload);
    if (!user) return res.sendStatus(404);

    req.decoded = {
      email: user.email,
      checkAction,
      subject: "Khóa tài khoản",
      html: `<p>Tài khoản của bạn đã bị khóa do vi phạm tiêu chuẩn cộng đồng nhiều lần.</p>
      <p>Vui lòng liên hệ tới email này để được hỗ trợ.</p>`
    }
    next();

  } catch (error) {
    res.send(error.message);
  }
};

exports.unblock = async (req, res, next) => {
  try {
    let { _id, checkAction } = req.body;

    let payload = {
      reportNumber: 0,
      isActive: 'Kích hoạt',
      updatedAt: req.getTime,
    };

    let user = await Users.findOneAndUpdate({ _id }, payload);
    if (!user) return res.sendStatus(404);

    req.decoded = {
      email: user.email,
      checkAction,
      subject: "Mở khóa tài khoản",
      html: `<p>Tài khoản của bạn đã được mở khóa.</p>
      <p>Chúc mừng và hy vọng bạn sẽ không tái phạm tiêu chuẩn cộng đồng.</p>`
    }
    next();

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
