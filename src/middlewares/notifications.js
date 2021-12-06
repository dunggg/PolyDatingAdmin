const Nofitications = require('../models/notifications.schema');
const Tokens = require('../models/tokens.schema');
const { response } = require("../utils/utils");
const info = require('../config/info');
const fetch = require('node-fetch');

const optionConfig = {
    'method': 'POST',
    'headers': {
        'Authorization': info.authorizationKey,
        'Content-Type': 'application/json'
    }
}

const pushNotificationUser = async (req, res) => {
    try {
        const notifiData = req.notifiData;
        const dataToken = await Tokens.findOne({ email: notifiData.email });

        const dataBody = {
            'data': {
                title: "Poly Dating",
                content: notifiData.content
            },
            'to': dataToken.token
        };

        const optionPush = {
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