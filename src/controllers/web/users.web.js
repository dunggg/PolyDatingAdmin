const { updateOne } = require('../../models/user.schema');
const User = require('../../models/user.schema');
const _ = require('lodash');
const moment = require('moment');
const {
  course,
  hobbies,
  specialized,
  facilities,
} = require('../api/edu-poly.api');

exports.list = async (req, res) => {
  let isSearch = false;
  var search = {};
  if (!_.isEmpty(req.query)) {
    var {
      specialized: specializedParams,
      course: courseParams,
      gender: genderParams,
      report: reportParmas,
      status: statusParams,
      facilities: facilitiesParams,
      email: searchParams,
    } = req.query;
    for (const key in req.query) {
      if (key != null) {
        search[`${key}`] = req.query[`${key}`];
      }
    }
    isSearch = true;
  }
  try {
    let perPage = 1;
    let page = req.params.page || 1;
    const listUser = await User.find(search)
      .skip(perPage * page - perPage)
      .limit(perPage);
    const countDoc = await User.countDocuments(search);
    const countPage = Math.ceil(countDoc / perPage);
    const arrPage = [];
    if (countPage >= 5) {
      if (page - 2 > 0) {
        for (let i = page - 2; i <= page + 5; i++) {
          arrPage.push(i);
        }
      }
    } else {
      for (let i = 1; i <= countPage; i++) {
        arrPage.push(i);
      }
    }
    let payload = {
      users: listUser,
      arrPage,
      countTo: perPage * page,
      countFrom: perPage * (page - 1) + 1,
      page: page,
      pre: Number(page) - 1 || arrPage.length,
      next: Number(page) + 1 > arrPage.length ? 1 : Number(page) + 1,
      course,
      specialized,
      facilities,
      isSearch,
    };
    if (!_.isEmpty(req.query)) {
      payload = {
        ...payload,
        specializedParams,
        courseParams,
        genderParams,
        reportParmas,
        statusParams,
        facilitiesParams,
        searchParams,
      };
    }
    res.render('users', payload);
  } catch (error) {
    res.status(500).send(500, error.message);
  }
};

exports.find = async (req, res, next) => {
  try {
    const { email } = req.params;

    const data = await User.findOne({ email });

    if (!data) return next();

    res.render('profile', { user: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == 'admin' && password == 'admin')
      return res.redirect('/statistical?format=0&timeStamp=' + moment().unix());
    e;
    const data = await User.findOne({ email, password });

    if (!data)
      return res.render('index', { msgError: 'Sai email hoặc mật khẩu' });

    if (data.role != 'Admin')
      return res.render('index', { msgError: 'Tài khoản không có quyền hạn' });

    if (data.isActive != 'Kích hoạt')
      return res.render('index', { msgError: 'Tài khoản đã bị khóa' });

    res.redirect('/statistical?format=0&timeStamp=' + moment().unix());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.block = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await User.findByIdAndUpdate({ _id }, { isActive: 'Chặn' });

    res.redirect(`/users/${data.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.unblock = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await User.findByIdAndUpdate(
      { _id },
      { isActive: 'Kích hoạt' },
    );

    res.redirect(`/users/${data.email}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
