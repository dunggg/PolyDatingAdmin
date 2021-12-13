const User = require('../../models/users.schema');
const Friend = require('../../models/friends.schema');
const Report = require('../../models/reports.schema');
const _ = require('lodash');
const moment = require('moment');
const json = require('../../config/masters.json');

const { course, specialized, facilities } = json[0];

let randomNumber = (length) => {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

const getDayOfMonth = (timeStamp) => {
  let listDayOfMonth = [];
  let month = moment(timeStamp * 1000).format('MM');
  let year = moment(timeStamp * 1000).format('YYYY');
  for (let i = 0; i < moment(timeStamp * 1000).daysInMonth(); i++) {
    const time = moment(
      `${year}/${month}/${moment(timeStamp * 1000)
        .startOf('month')
        .add(i, 'days')
        .format('DD')}`,
    ).unix();
    listDayOfMonth.push(time);
  }
  return listDayOfMonth;
};

const getTimeStampMonthsOfYear = (timeStamp = moment().unix()) => {
  let listMonthOfYear = [];
  let year = moment(timeStamp * 1000).format('YYYY');
  for (let i = 0; i < 12; i++) {
    const time = moment(`${year}/${i + 1}`).unix();
    listMonthOfYear.push(time);
  }
  return listMonthOfYear;
};

const listTotalReportDaysOfMonth = (totalReport, timeStamp) => {
  const listDayOfMonth = getDayOfMonth(timeStamp);
  const listTotalReport = [];
  for (let i = 0; i < listDayOfMonth.length; i++) {
    const totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('DD/MM/YYYY') ===
        moment(listDayOfMonth[i] * 1000).format('DD/MM/YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

const listTotalMonthsOfYear = (totalReport, timeStamp) => {
  const listMonth = getTimeStampMonthsOfYear(timeStamp);
  const listTotalReport = [];
  for (let i = 0; i < listMonth.length; i++) {
    const totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('MM/YYYY') ===
        moment(listMonth[i] * 1000).format('MM/YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

const listTotalReportYears = (totalReport, timeStamp) => {
  const yearNow = 2020;
  const listYear = [];
  for (let i = 0; i <= 10; i++) {
    const time = moment(`${yearNow + i}`).unix();
    listYear.push(time);
  }
  const listTotalReport = [];
  for (let i = 0; i < listYear.length; i++) {
    const totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('YYYY') ===
        moment(listYear[i] * 1000).format('YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

const countMatch = async (timeStamp, format, objSearch) => {
  const listFriend = await Friend.find({ status: true, ...objSearch });
  let list = [];
  switch (Number(format)) {
    case 0:
      list = listTotalReportDaysOfMonth(listFriend, timeStamp);
      break;
    case 2:
      list = listTotalReportYears(listFriend, timeStamp);
      break;
    default:
      list = listTotalMonthsOfYear(listFriend, timeStamp);
  }
  return list;
};

const countReport = async (timeStamp, format, objSearch) => {
  const total = await Report.find(objSearch);
  let list = [];
  switch (Number(format)) {
    case 0:
      list = listTotalReportDaysOfMonth(total, timeStamp);
      break;
    case 2:
      list = listTotalReportYears(total, timeStamp);
      break;
    default:
      list = listTotalMonthsOfYear(total, timeStamp);
  }
  return list;
};

// console.log(moment('2021-12-13T11:09:08.000+00:00').format('DD/MM/YYYY'));

// console.log(moment(1639409570 * 1000).format());

// console.log(new Date().);
// console.log(moment(moment().toDate()).isBefore(new Date()));

// countMatch(1639409570);

// console.log(moment('2021-12-13T07:18:13.699+00:00').unix());

// countReport(1639379893);

exports.statistical = async (req, res) => {
  try {
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
        (x, i) =>
          moment(Number(timeStamp) * 1000)
            .startOf('month')
            .add(i, 'days')
            .format('DD'),
      );
    } else if (Number(format) === 2) {
      data = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    }

    let objSearch = {};

    objSearch = courseParams ? { ...objSearch, course: courseParams } : {};
    objSearch = specializedParams
      ? { ...objSearch, specialized: specializedParams }
      : {};
    objSearch = facilitiesParams
      ? { ...objSearch, facilities: facilitiesParams }
      : {};

    const totalUser = await User.countDocuments(objSearch);
    const totalUserMale = await User.countDocuments({
      gender: 'Nam',
      ...objSearch,
    });
    const totalUserFemale = await User.countDocuments({
      gender: 'Nữ',
      ...objSearch,
    });
    const totalReport = await countReport(timeStamp, format, objSearch);
    const totalMatch = await countMatch(timeStamp, format, objSearch);

    res.render('statistical', {
      totalUser,
      totalUserMale,
      totalUserFemale,
      totalMatch,
      totalActivityUser: randomNumber(data.length),
      totalTimeActivityUser: randomNumber(data.length),
      totalReport,
      totalMessage: randomNumber(data.length),
      totalBlock: randomNumber(data.length),
      data,
      course: masters.course,
      specialized: masters.specialized,
      facilities: masters.facilities,
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
    res.send(error.message);
  }
};
