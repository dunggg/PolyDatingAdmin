let Reports = require('../../models/reports.schema');
let Masters = require('../../models/masters.schema');
let Users = require('../../models/users.schema');
let moment = require('moment');

let statusReports = ['Trạng thái', 'Chấp thuận', 'Từ chối', 'Chờ duyệt'];

exports.list = async (req, res) => {
  try {
    let { page } = req.params;
    let { search, titleOp, statusOp } = req.query;

    let pageSize = 20;
    let pageNumber = Number(page) || 1;
    let skipPage = pageSize * pageNumber - pageSize;

    let optionFind = {};

    if (search || titleOp || statusOp) {
      optionFind = {
        title: new RegExp(`.*${titleOp || ''}.*`),
        status: new RegExp(`.*${statusOp || ''}.*`),
        $or: [
          { emailSender: new RegExp(`.*${search || ''}.*`, 'i') },
          { emailReceiver: new RegExp(`.*${search || ''}.*`, 'i') },
          { title: new RegExp(`.*${search || ''}.*`, 'i') },
          { content: new RegExp(`.*${search || ''}.*`, 'i') },
          { status: new RegExp(`.*${search || ''}.*`, 'i') },
        ],
      };
    }

    let dataTitleReports = await Masters.findOne();
    dataTitleReports.reports.splice(0, 0, 'Tiêu đề');

    let reportsWait = await Reports.countDocuments({ status: 'Chờ duyệt' });

    let reports = await Reports.find(optionFind)
      .limit(pageSize)
      .skip(skipPage)
      .sort({ createdAt: -1 });

    let countReports = await Reports.countDocuments(optionFind);

    let totalReportsPage = Math.ceil(countReports / pageSize);

    let countReportsPage = [];
    for (let index = 1; index <= totalReportsPage; index++) {
      countReportsPage.push(index);
    }

    let countFrom = pageSize * (pageNumber - 1) + 1;
    let countTo = pageSize * pageNumber;
    let previousPage = pageNumber - 1;
    let nextPage = pageNumber + 1;

    if (countReports < skipPage || countReports < 1) {
      countFrom = 0;
      countTo = 0;
    } else if (countReports < countTo) {
      countTo = countReports;
    }

    for (let index = 0; index < reports.length; index++) {
      reports[index].index = countFrom + index;
    }

    let paging = {
      pageNumber,
      countReports,
      countReportsPage,
      totalReportsPage,
      previousPage,
      nextPage,
      countFrom,
      countTo,
    };

    let payload = {
      reports,
      statusReports,
      dataTitleReports: dataTitleReports.reports,
      titleOp,
      statusOp,
      search,
      reportsWait,
      timeStamp: moment().unix(),
      ...paging,
    };

    res.render('reports', payload);
  } catch (error) {
    res.send(error.message);
  }
};

exports.verifyReportRequest = async (req, res) => {
  try {
    let { email, _idReport, action } = req.body;

    let user = await Users.findOne({ email });
    if (!user) return res.sendStatus(404);

    let status;
    let reportNumber;

    if (action == 'true') {
      status = 'Chấp thuận';
      reportNumber = user.reportNumber + 1;
    } else {
      status = 'Từ chối';
      reportNumber = user.reportNumber;
    }

    const payload = {
      isActive: false,
      updatedAt: req.getTime,
    };

    const payload2 = {
      reportNumber,
      updatedAt: req.getTime,
    };

    if (user.reportNumber >= 5) {
      await Users.updateOne({ email }, payload);
    } else {
      await Users.updateOne({ email }, payload2);
    }

    await Reports.updateOne({ _id: _idReport }, { status });

    res.redirect(`/reports`);
  } catch (error) {
    res.send(error.message);
  }
};
