let Masters = require('../../models/masters.schema');
let Users = require('../../models/users.schema');
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let exportExcel = require('../../utils/exportExcel');
let moment = require('moment');

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

let listTotalReportsDaysOfMonth = (totalReports, timeStamp) => {
  let listDayOfMonth = getDayOfMonth(timeStamp);
  let listTotalReports = [];
  for (let i = 0; i < listDayOfMonth.length; i++) {
    let totalForTimeStamp = totalReports.filter(
      (value) =>
        moment(value.createAt).format('DD/MM/YYYY') ===
        moment(listDayOfMonth[i] * 1000).format('DD/MM/YYYY'),
    );
    listTotalReports.push(totalForTimeStamp.length);
  }
  return listTotalReports;
};

let listTotalMonthsOfYear = (totalReports, timeStamp) => {
  let listMonth = getTimeStampMonthsOfYear(timeStamp);
  let listTotalReports = [];
  for (let i = 0; i < listMonth.length; i++) {
    let totalForTimeStamp = totalReports.filter(
      (value) =>
        moment(value.createAt).format('MM/YYYY') ===
        moment(listMonth[i] * 1000).format('MM/YYYY'),
    );
    listTotalReports.push(totalForTimeStamp.length);
  }
  return listTotalReports;
};

let listTotalReportsYears = (totalReports, timeStamp) => {
  let yearNow = 2021;
  let listYear = [];
  for (let i = 0; i < 10; i++) {
    let time = moment(`${yearNow + i}`).unix();
    listYear.push(time);
  }
  let listTotalReports = [];
  for (let i = 0; i < listYear.length; i++) {
    let totalForTimeStamp = totalReports.filter(
      (value) =>
        moment(value.createAt).format('YYYY') ===
        moment(listYear[i] * 1000).format('YYYY'),
    );
    listTotalReports.push(totalForTimeStamp.length);
  }
  return listTotalReports;
};

let countMatch = async (timeStamp, format, objSearch, status) => {
  let listFriends = await Friends.find({ status, ...objSearch });
  let list = [];
  switch (Number(format)) {
    case 0:
      list = listTotalReportsDaysOfMonth(listFriends, timeStamp);
      break;
    case 2:
      list = listTotalReportsYears(listFriends, timeStamp);
      break;
    default:
      list = listTotalMonthsOfYear(listFriends, timeStamp);
  }
  return list;
};

let countReports = async (timeStamp, format, objSearch) => {
  let total = await Reports.find(objSearch);
  let list = [];
  switch (Number(format)) {
    case 0:
      list = listTotalReportsDaysOfMonth(total, timeStamp);
      break;
    case 2:
      list = listTotalReportsYears(total, timeStamp);
      break;
    default:
      list = listTotalMonthsOfYear(total, timeStamp);
  }
  return list;
};

let countBlock = async (timeStamp, format, objSearch) => {
  let total = await Users.find({ ...objSearch, isActive: 'Khóa' });
  let list = [];
  switch (Number(format)) {
    case 0:
      list = listTotalReportsDaysOfMonth(total, timeStamp);
      break;
    case 2:
      list = listTotalReportsYears(total, timeStamp);
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

    let { facilities, specialized, course } = await Masters.findOne();
    let reportsWait = await Reports.countDocuments({ status: 'Chờ duyệt' });

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
      data = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    }

    let objSearch = {};

    objSearch = courseParams ? { ...objSearch, course: courseParams } : {};
    objSearch = specializedParams
      ? { ...objSearch, specialized: specializedParams }
      : {};
    objSearch = facilitiesParams
      ? { ...objSearch, facilities: facilitiesParams }
      : {};

    let totalUser = await Users.countDocuments(objSearch);
    let totalUserMale = await Users.countDocuments({
      ...objSearch,
      gender: 'Nam',
      role: 'Người dùng',
    });
    console.log(totalUserMale, 'totalUserMale');
    let totalUserFemale = await Users.countDocuments({
      ...objSearch,
      gender: 'Nữ',
      role: 'Người dùng',
    });
    let totalReport = await countReports(timeStamp, format, objSearch);
    let totalMatch = await countMatch(timeStamp, format, objSearch, true);
    let totalMatchPending = await countMatch(
      timeStamp,
      format,
      objSearch,
      false,
    );
    let totalBlock = await countBlock(timeStamp, format, objSearch);

    let totalReportServer = await Reports.countDocuments({});

    res.render('statistical', {
      totalReportServer,
      totalUser,
      totalUserMale,
      totalUserFemale,
      totalMatch,
      totalReport,
      totalBlock,
      totalMatchPending,
      currentUserWeb: req.currentUserWeb,
      data,
      reportsWait,
      course: course,
      specialized: specialized,
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
    res.send(error.message);
  }
};

let exportFile = async (req, res) => {
  try {
    let totalUser = await Users.countDocuments({});
    let totalMale = await Users.countDocuments({
      gender: 'Nam',
      role: 'Người dùng',
    });
    let totalFeMale = await Users.countDocuments({
      gender: 'Nữ',
      role: 'Người dùng',
    });
    let totalReport = await Reports.countDocuments({});

    let timeStamp = moment().unix();
    let totalMatchMonths = await countMatch(timeStamp, 1, {}, true);
    let totalMatchPendingMonths = await countMatch(timeStamp, 1, {}, false);
    let totalReportMonths = await countReports(timeStamp, 1, {});
    let totalBlockMonths = await countBlock(timeStamp, 1, {});

    let totalMatchYears = await countMatch(timeStamp, 2, {}, true);
    let totalMatchPendingYears = await countMatch(timeStamp, 2, {}, false);
    let totalReportYears = await countReports(timeStamp, 2, {});
    let totalBlockYears = await countBlock(timeStamp, 2, {});

    let listUser = await Users.find({});
    listUser = listUser.map((value, index) => ({
      index: index + 1,
      email: value.email,
      name: value.name,
      role: value.role,
      phoneNumber: value.phone,
      gender: value.gender,
      birthDay: value.birthDay,
      hobbies: value.hobbies.toString(),
      facilities: value.facilities,
      specialized: value.specialized,
      course: value.course,
      reportNumber: value.reportNumber,
      isActive: value.isActive,
      createAt: moment(value.createAt).format('DD/MM/YYYY'),
      updateAt: moment(value.updateAt).format('DD/MM/YYYY'),
    }));

    let { facilities } = await Masters.findOne();

    let fileName = exportExcel(
      {
        totalUser,
        totalMale,
        totalFeMale,
        totalReport,
        facilities: facilities.slice(1),
      },
      {
        totalMatchMonths,
        totalReportMonths,
        totalBlockMonths,
        totalMatchPendingMonths,
      },
      {
        totalMatchYears,
        totalReportYears,
        totalBlockYears,
        totalMatchPendingYears,
      },
      listUser,
    );

    res.json(fileName);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { statistical, exportFile };
