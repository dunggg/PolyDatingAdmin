const User = require('../../models/user.schema');
const _ = require('lodash');

exports.statistical = async (req, res) => {
  try {
    const countUser = await User.countDocuments();
    const countUserMale = await User.countDocuments({ gender: 'Nam' });
    const countUserFemale = await User.countDocuments({ gender: 'Nữ' });

    res.render('statistical', { countUser, countUserMale, countUserFemale });
  } catch (error) {
    res.status(500).send(500, error.message);
  }
};
