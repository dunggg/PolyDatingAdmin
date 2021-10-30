const User = require('../../models/user.schema');
const { response } = require('../../utils/utils');
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
    const data = await User.find();
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
    res.status(500).json(response(500, error.message));
  }
};

exports.find = async (req, res, next) => {
  try {
    const data = await User.findOne({ email: req.params.email });

    if (!data) return next();

    res.render('profile', { user: data });
  } catch (error) {
    next();
  }
};
