let Users = require("../models/users.schema");
let { response } = require("../utils/utils");
let info = require('../config/info');
let jwt = require('jsonwebtoken');

let checkToken = async (req, res, next) => {
    try {
        let authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) return res.sendStatus(400);

        let token = authorizationHeader.split(' ')[1];

        let dataToken = jwt.verify(token, info.accessKey);
        let user = await Users.findOne({ email: dataToken });

        if (!user) {
            res.status(404).json(response(404, `Tài khoản không tồn tại`));
        }
        else if (user.isActive == "Khóa") {
            res.status(403).json(response(403, `Tài khoản của bạn đã bị khóa, vui lòng kiểm tra email`));
        }
        else {
            req.currentUser = user;
            next();
        }

    } catch (error) {
        if (error.message == "jwt malformed") {
            return res.sendStatus(401);
        }
        res.status(500).json(response(500, error.message));
    }
};

let checkTokenWebsite = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.redirect('/');
        }

        let accessToken = req.cookies.token;
        let verifyToken = jwt.verify(accessToken, info.accessKey);
        let user = await Users.findOne({ email: verifyToken });

        if (!user) {
            res.clearCookie('token');
            return res.redirect('/');
        }

        req.currentUserWeb = user;
        next()

    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { checkToken, checkTokenWebsite };