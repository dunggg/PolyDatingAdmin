const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/uploadFile');
const getTimeZone = require('../middlewares/getTime');
const { sendMailForgotPassword } = require('../middlewares/sendMail');
const { pushNotificationUser } = require('../middlewares/notifications');
const employees = require('../controllers/web/employees');
const users = require('../controllers/web/users.web');
const { statistical } = require('../controllers/web/statistical.web');

/* Website */
router.use(getTimeZone);

// 1. Employees
router.get('/', employees.index);
router.post('/sign-in', employees.signIn);
router.post('/sign-up', uploadFile, employees.signUp);
router.post(
  '/forgot-password',
  employees.forgotPassword,
  sendMailForgotPassword,
);

//2. Users
router.get('/users', users.list);
router.get('/users/:email', users.findOne);
router.post('/users/block', users.block);
router.post('/users/unblock', users.unblock);

router.get('/statistical', statistical);

module.exports = router;
