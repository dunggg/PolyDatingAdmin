let Notifications = require('../models/notifications.schema');
let { response } = require("../utils/utils");
let info = require('../config/info');
let fetch = require('node-fetch');

let optionConfig = {
    'method': 'POST',
    'headers': {
        'Authorization': info.authorizationKey,
        'Content-Type': 'application/json'
    }
};

let pushNotificationsFriendsRequest = async (req, res) => {
    try {
        let notifiData = req.notifiData;

        let optionNotifi = {
            emailSender: notifiData.emailSender,
            emailReceiver: notifiData.emailReceiver,
            title: "Yêu cầu kết bạn",
            content: notifiData.content,
            link: null,
            createdAt: req.getTime
        }

        await Notifications.create(optionNotifi);

        let dataBody = {
            'data': {
                title: `Poly Dating - ${optionNotifi.title}`,
                content: notifiData.content
            },
            'to': notifiData.token
        };

        let optionPush = {
            ...optionConfig,
            'body': JSON.stringify(dataBody)
        };

        fetch('https://fcm.googleapis.com/fcm/send', optionPush)
            .then(() => res.status(200).json(response(200, notifiData.message)));

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

let pushNotificationsAll = async (req, res) => {
    try {
        let notifiData = req.notifiData;

        let dataBody = {
            'data': {
                title: `Poly Dating - ${notifiData.title}`,
                content: notifiData.content
            },
            'registration_ids': notifiData.tokens
        };

        let optionPush = {
            ...optionConfig,
            'body': JSON.stringify(dataBody)
        };

        fetch('https://fcm.googleapis.com/fcm/send', optionPush)
            .then(() => res.redirect('/notifications/page/1'));

    } catch (error) {
        res.send(error.message);
    }
};

module.exports = {
    pushNotificationsFriendsRequest,
    pushNotificationsAll
};