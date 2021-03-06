let Users = require('../../models/users.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');
let moment = require('moment');

exports.list = async (req, res) => {
  try {
    let { page } = req.params;
    let { search } = req.query;

    let pageSize = 20;
    let pageNumber = Number(page) || 1;
    let skipPage = pageSize * pageNumber - pageSize;

    let optionFind = {
      emailSender: { $not: new RegExp(`.*@fpt.edu.vn.*`) },
    };

    if (search) {
      optionFind = {
        $or: [
          { emailSender: new RegExp(`.*${search}.*`, 'i') },
          { emailReceiver: new RegExp(`.*${search}.*`, 'i') },
          { title: new RegExp(`.*${search}.*`, 'i') },
          { content: new RegExp(`.*${search}.*`, 'i') },
          { link: new RegExp(`.*${search}.*`, 'i') },
        ],
      };
    }

    let reportsWait = await Reports.countDocuments({ status: 'Chờ duyệt' });

    let notifications = await Notifications.find(optionFind)
      .limit(pageSize)
      .skip(skipPage)
      .sort({ createdAt: -1 });

    let countNotifications = await Notifications.countDocuments(optionFind);

    let totalNotificationsPage = Math.ceil(countNotifications / pageSize);

    let countNotificationsPage = [];
    for (let index = 1; index <= totalNotificationsPage; index++) {
      countNotificationsPage.push(index);
    }

    let countFrom = pageSize * (pageNumber - 1) + 1;
    let countTo = pageSize * pageNumber;
    let previousPage = pageNumber - 1;
    let nextPage = pageNumber + 1;

    if (countNotifications < skipPage || countNotifications < 1) {
      countFrom = 0;
      countTo = 0;
    } else if (countNotifications < countTo) {
      countTo = countNotifications;
    }

    for (let i = 0; i < notifications.length; i++) {
      notifications[i].index = countFrom + i;
    }

    let paging = {
      pageNumber,
      countNotifications,
      countNotificationsPage,
      totalNotificationsPage,
      previousPage,
      nextPage,
      countFrom,
      countTo,
    };

    let payload = {
      notifications,
      reportsWait,
      search,
      currentUserWeb: req.currentUserWeb,
      timeStamp: moment().unix(),
      ...paging,
    };

    res.render('notifications', payload);
  } catch (error) {
    res.send(error.message);
  }
};

exports.insert = async (req, res, next) => {
  try {
    let { title, link, content } = req.body;

    let dataUsers = await Users.find({ role: 'Người dùng' });
    let dataUsersTokens = [];

    for (let i = 0; i < dataUsers.length; i++) {
      let ontion = {
        emailSender: req.currentUserWeb.email,
        emailReceiver: dataUsers[i].email,
        title,
        content,
        link: link || '',
        createdAt: req.getTime,
      };
      await Notifications.create(ontion);

      if (dataUsers[i].notificationToken) {
        dataUsersTokens.push(dataUsers[i].notificationToken);
      }
    }

    req.notifiData = {
      title,
      content,
      tokens: dataUsersTokens,
    };
    next();

  } catch (error) {
    res.send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    let { _id } = req.body;

    await Notifications.deleteOne({ _id });
    res.redirect('/notifications');
  } catch (error) {
    res.send(error.message);
  }
};
