let Masters = require('../../models/masters.schema');
let User = require('../../models/users.schema');
let Friend = require('../../models/friends.schema');
let Report = require('../../models/reports.schema');
let _ = require('lodash');
let moment = require('moment');
let json = require('../../config/masters.json');
let exportExcel = require('../../utils/exportExcel');

let { course, specialized, facilities } = json[0];

let randomNumber = (length) => {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

let getDayOfMonth = (timeStamp) => {
  let listDayOfMonth = [];
  let month = moment(timeStamp * 1000).format('MM');
  let year = moment(timeStamp * 1000).format('YYYY');
  for (let i = 0; i < moment(timeStamp * 1000).daysInMonth(); i++) {
    let time = moment(
      `${year}/${month}/${moment(timeStamp * 1000)
        .startOf('month')
        .add(i, 'days')
        .format('DD')}`,
    ).unix();
    listDayOfMonth.push(time);
  }
  return listDayOfMonth;
};

let getTimeStampMonthsOfYear = (timeStamp = moment().unix()) => {
  let listMonthOfYear = [];
  let year = moment(timeStamp * 1000).format('YYYY');
  for (let i = 0; i < 12; i++) {
    let time = moment(`${year}/${i + 1}`).unix();
    listMonthOfYear.push(time);
  }
  return listMonthOfYear;
};

let listTotalReportDaysOfMonth = (totalReport, timeStamp) => {
  let listDayOfMonth = getDayOfMonth(timeStamp);
  let listTotalReport = [];
  for (let i = 0; i < listDayOfMonth.length; i++) {
    let totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('DD/MM/YYYY') ===
        moment(listDayOfMonth[i] * 1000).format('DD/MM/YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

let listTotalMonthsOfYear = (totalReport, timeStamp) => {
  let listMonth = getTimeStampMonthsOfYear(timeStamp);
  let listTotalReport = [];
  for (let i = 0; i < listMonth.length; i++) {
    let totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('MM/YYYY') ===
        moment(listMonth[i] * 1000).format('MM/YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

let listTotalReportYears = (totalReport, timeStamp) => {
  let yearNow = 2020;
  let listYear = [];
  for (let i = 0; i <= 10; i++) {
    let time = moment(`${yearNow + i}`).unix();
    listYear.push(time);
  }
  let listTotalReport = [];
  for (let i = 0; i < listYear.length; i++) {
    let totalForTimeStamp = totalReport.filter(
      (value) =>
        moment(value.createAt).format('YYYY') ===
        moment(listYear[i] * 1000).format('YYYY'),
    );
    listTotalReport.push(totalForTimeStamp.length);
  }
  return listTotalReport;
};

let countMatch = async (timeStamp, format, objSearch) => {
  let listFriend = await Friend.find({ status: true, ...objSearch });
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

let countReport = async (timeStamp, format, objSearch) => {
  let total = await Report.find(objSearch);
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

let statistical = async (req, res) => {
  try {
    let {
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

    let totalUser = await User.countDocuments(objSearch);
    let totalUserMale = await User.countDocuments({
      gender: 'Nam',
      ...objSearch,
    });
    let totalUserFemale = await User.countDocuments({
      gender: 'Nữ',
      ...objSearch,
    });
    let totalReport = await countReport(timeStamp, format, objSearch);
    let totalMatch = await countMatch(timeStamp, format, objSearch);

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
      course: course,
      specialized: specialized,
      facilities: facilities,
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

let exportFile = async (req, res) => {
  try {
    let fileName = exportExcel();
    res.render('download_xlsx', { fileName });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { statistical, exportFile };