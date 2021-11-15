const User = require('../../models/user.schema');
const _ = require('lodash');
const moment = require('moment');

const randomNumber = (length) => {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

exports.statistical = async (req, res) => {
  const { timeStamp, format } = req.query;
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (Number(format) === 1) {
    data = Array.from(
      { length: moment(Number(timeStamp) * 1000).daysInMonth() },
      (x, i) => moment().startOf('month').add(i, 'days').format('DD'),
    );
  }
  try {
    const totalUser = await User.countDocuments();
    const totalUserMale = await User.countDocuments({ gender: 'Nam' });
    const totalUserFemale = await User.countDocuments({ gender: 'Nữ' });

    res.render('statistical', {
      totalUser,
      totalUserMale,
      totalUserFemale,
      totalMatch: randomNumber(data.length),
      totalActivityUser: randomNumber(data.length),
      totalTimeActivityUser: randomNumber(data.length),
      totalReport: randomNumber(data.length),
      totalMessage: randomNumber(data.length),
      totalBlock: randomNumber(data.length),
      data,
    });
  } catch (error) {
    res.status(500).send(500, error.message);
  }
};
