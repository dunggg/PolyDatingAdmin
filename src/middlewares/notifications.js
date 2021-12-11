let Nofitications = require('../models/notifications.schema');
let Tokens = require('../models/tokens.schema');
let { response } = require("../utils/utils");
let randomString = require('randomstring');
let info = require('../config/info');
let fetch = require('node-fetch');

let optionConfig = {
    'method': 'POST',
    'headers': {
        'Authorization': info.authorizationKey,
        'Content-Type': 'application/json'
    }
};

let pushNotificationUser = async (req, res) => {
    try {
        let notifiData = req.notifiData;
        let dataToken = await Tokens.findOne({ email: notifiData.emailReceiver });

        let optionNotifi = {
            emailSender: notifiData.emailSender,
            emailReceiver: notifiData.emailReceiver,
            title: "Yêu cầu kết bạn",
            content: notifiData.content,
            link: null,
            randomKey: randomString.generate(10),
            createdAt: req.getTime
        }

        await Nofitications.create(optionNotifi);

        let dataBody = {
            'data': {
                title: `Poly Dating - ${optionNotifi.title}`,
                content: notifiData.content
            },
            'to': dataToken.token
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

module.exports = { pushNotificationUser };