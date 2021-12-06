const Nofitications = require('../models/notifications.schema');
const Tokens = require('../models/tokens.schema');
const { response } = require("../utils/utils");
const info = require('../config/info');
const fetch = require('node-fetch');

exports.pushNotificationUser = async (req, res) => {
    try {


        // const optionPush = {
        //     'method': 'POST',
        //     'headers': {
        //         'Authorization': info.authorizationKey,
        //         'Content-Type': 'application/json'
        //     },
        //     'body': {

        //     }
        // }


        // const nofiti = {
        //     'title': "Hello 123",
        //     'content': "Đầu buồi thắng rách"
        // }

        // const headerNoti = 
        
        // const bodyNoti = {
        //     'data': nofiti,
        //     "registration_ids": token
        // }

        // fetch('https://fcm.googleapis.com/fcm/send', {
        //     'method': 'POST',
        //     'headers': {
        //         'Authorization': ,
        //         'Content-Type': 'application/json'
        //     },
        //     'body': JSON.stringify(nofibody)
        // }).then(() => res.json(nofibody)).catch((err) => console.log(err))

    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};
