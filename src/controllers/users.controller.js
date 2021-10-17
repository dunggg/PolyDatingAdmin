const User = require('../models/user.shema');
const { baseJson, validateUser } = require('../utils/utils');

exports.list = async (req, res) => {
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
    };
    res.render('users', payload);
  } catch (error) {
    res.status(400).json(baseJson(400, error));
  }
};
