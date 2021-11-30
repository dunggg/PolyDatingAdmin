const User = require('../../models/user.schema');
const _ = require('lodash');
const moment = require('moment');
const { course, specialized, facilities } = require('../api/edu-poly.api');

const randomNumber = (length) => {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

exports.statistical = async (req, res) => {
  const {
    timeStamp,
    format,
    course: courseParams,
    specialized: specializedParams,
    facilities: facilitiesParams,
  } = req.query;
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (Number(format) === 0) {
    data = Array.from(
      { length: moment(Number(timeStamp) * 1000).daysInMonth() },
      (x, i) => moment().startOf('month').add(i, 'days').format('DD'),
    );
  } else if (Number(format) === 2) {
    data = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
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
      course,
      specialized,
      facilities,
      courseParams,
      specializedParams,
      facilitiesParams,
      timeParams: format,
      timeStamp: moment().unix(),
      title:
        data.length === 12
          ? `năm ${moment(timeStamp * 1000).format('YYYY')}`
          : data.length === 11
          ? `từ năm ${data[0]} đến năm ${data[data.length - 1]}`
          : `tháng ${moment(timeStamp * 1000).format('MM')} năm ${moment(
              timeStamp * 1000,
            ).format('YYYY')}`,
    });
  } catch (error) {
    res.status(500).send(500, error.message);
  }
};
