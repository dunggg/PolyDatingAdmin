let Users = require("../../models/users.schema");
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');

exports.list = async (req, res) => {
    try {
        let { page } = req.params;
        let { search } = req.query;

        let pageSize = 20;
        let pageNumber = Number(page) || 1;
        let skipPage = (pageSize * pageNumber) - pageSize;

        let notifications;
        let countNotifications;

        let reportsWait = await Reports.countDocuments({ status: "Chờ duyệt" });

        if (search) {
            let optionFind = {
                $or: [
                    { emailSender: { $regex: `.*${search}.*`, $options: "i" } },
                    { emailReceiver: { $regex: `.*${search}.*`, $options: "i" } },
                    { title: { $regex: `.*${search}.*`, $options: "i" } },
                    { content: { $regex: `.*${search}.*`, $options: "i" } },
                    { link: { $regex: `.*${search}.*`, $options: "i" } }
                ]
            };

            notifications = await Notifications.find(optionFind)
                .limit(pageSize).skip(skipPage).sort({ createdAt: -1 });

            countNotifications = await Notifications.countDocuments(optionFind);
        }
        else {
            notifications = await Notifications.find()
                .limit(pageSize).skip(skipPage).sort({ createdAt: -1 });

            countNotifications = await Notifications.countDocuments();
        }

        let totalNotificationsPage = Math.ceil(countNotifications / pageSize);

        let countNotificationsPage = [];
        for (let index = 1; index <= totalNotificationsPage; index++) {
            countNotificationsPage.push(index);
        }

        let countFrom = pageSize * (pageNumber - 1) + 1;
        let countTo = (pageSize * pageNumber);
        let previousPage = pageNumber - 1;
        let nextPage = pageNumber + 1;

        if (countNotifications < skipPage || countNotifications < 1) {
            countFrom = 0;
            countTo = 0
        }
        else if (countNotifications < countTo) {
            countTo = countNotifications;
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
            ...paging
        };

        res.render('notifications', payload);
    } catch (error) {
        res.send(error.message);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let { title, link, content } = req.body;

        let dataUsers = await Users.find();
        let dataUsersTokens = [];

        for (let i = 0; i < dataUsers.length; i++) {
            let ontion = {
                emailSender: "polydating@gmail.com.vn",
                emailReceiver: dataUsers[i].email,
                title: title || "",
                content: content || "",
                link: link || "",
                createdAt: req.getTime
            }
            await Notifications.create(ontion);

            if (dataUsers[i].notificationToken) {
                dataUsersTokens.push(dataUsers[i].notificationToken);
            }
        }

        req.notifiData = {
            title,
            content,
            tokens: dataUsersTokens
        }
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