let Masters = require('../../models/masters.schema');
let Users = require("../../models/users.schema");
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');

exports.list = async (req, res) => {
    try {

        const notifications = await Notifications.find();



        res.render('notifications', { notifications });

    } catch (error) {
        res.send(error.message);
    }
};