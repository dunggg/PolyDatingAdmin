const { updateOne } = require('../../models/user.schema');
const User = require('../../models/user.schema');
const {
  course,
  hobbies,
  specialized,
  facilities,
} = require('../api/edu-poly.api');

exports.list = async (req, res) => {
  let isSearch = false;
  if (req.query !== {}) {
    const { specialized, course, gender, report, status } = req.query;
    isSearch = true;
  }
  try {
    let perPage = 5;
    let page = req.params.page || 1;
    const listUser = await User.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
    const countDoc = await User.countDocuments();
    const countPage = Math.ceil(countDoc / perPage);
    const arrPage = [];
    for (let i = 1; i <= countPage; i++) {
      arrPage.push(i);
    }
    const payload = {
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

    res.render('users', payload);
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.find = async (req, res, next) => {
  try {
    const { email } = req.params;

    const data = await User.findOne({ email });

    if (!data) return next();

    res.render('profile', { user: data });
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email == "admin" && password == "admin") return res.redirect('/statistical')

    const data = await User.findOne({ email, password });

    if (!data) return res.render('index', { msgError: "Sai email hoặc mật khẩu" })

    if (data.role != "Admin") return res.render('index', { msgError: "Tài khoản không có quyền hạn" })

    if (data.isActive != "Kích hoạt") return res.render('index', { msgError: "Tài khoản đã bị khóa" })

    res.redirect('/statistical')
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.block = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await User.findByIdAndUpdate({ _id }, { isActive: "Chặn" })

    res.redirect(`/users/${data.email}`);
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.unblock = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await User.findByIdAndUpdate({ _id }, { isActive: "Kích hoạt" })

    res.redirect(`/users/${data.email}`);
  } catch (error) {
    res.status(500).send(error.message)
  }
}