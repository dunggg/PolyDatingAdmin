const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const { sendMailForgotPassword } = require('../middlewares/sendMail');
const { pushNotificationUser } = require('../middlewares/notifications');
const masters = require("../controllers/api/masters.api");
const employees = require("../controllers/web/employees");


/* Website */
router.use(getTimeZone);

// 1. Employees
router.get('/', employees.index);
router.post('/sign-in', employees.signIn);
router.post('/sign-up', uploadFile, employees.signUp);
router.post('/forgot-password', employees.forgotPassword, sendMailForgotPassword);

module.exports = router;