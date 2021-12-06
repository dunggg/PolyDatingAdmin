const Nofitications = require('../models/notifications.schema');
const Tokens = require('../models/tokens.schema');
const { response } = require("../utils/utils");
const info = require('../config/info');
const fetch = require('node-fetch');

const optionPush = {
    'method': 'POST',
    'headers': {
        'Authorization': info.authorizationKey,
        'Content-Type': 'application/json'
    }
}

const pushNotificationUser = async (req, res) => {
    try {
        // const nofiti = {
        //     'title': "Hello 123",
        //     'content': "Đầu buồi thắng rách"
        // }

        // const headerNoti = 

        // const bodyNoti = {
        //     'data': nofiti,
        //     "registration_ids": token
        // }

        const option = {
            ...optionPush,
            'body': {
                'data': "Test",
                'registration_ids': "token"
            }
        }

        console.log(option);

        // fetch('https://fcm.googleapis.com/fcm/send', optionPush)
        //     .then(() => res.json("ok"))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

module.exports = { pushNotificationUser };