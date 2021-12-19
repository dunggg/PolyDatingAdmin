let express = require('express');
let router = express.Router();
let uploadFile = require('../middlewares/uploadFile');
let { checkTokenWebsite } = require('../middlewares/checkToken');
let { sendMailForgotPassword } = require('../middlewares/sendMail');
let { pushNotificationsAll } = require('../middlewares/notifications');
let users = require('../controllers/web/users.web');
let reports = require('../controllers/web/reports.web');
let notifications = require('../controllers/web/notifications.web');
let { statistical, exportFile } = require('../controllers/web/statistical.web');

/* Website */
router.get('/', users.index);
router.post('/login', users.logIn);
router.get('/forgot-password', users.screenForgotPassword);
router.post('/users/forgot-password', users.forgotPassword, sendMailForgotPassword);
router.get('/get-file-apk', users.getFileApk);
router.use(checkTokenWebsite);

//1. Users
router.get('/logout', users.logOut);
router.get('/users', users.list);
router.get('/users/page/:page', users.list);
router.get('/users/:email', users.findOne);
router.post('/users/insert', uploadFile, users.insert);
router.post('/users/update-information', uploadFile, users.updateInformation);
router.post('/users/update-password', users.updatePassword);
router.post('/users/block', users.block);
router.post('/users/unblock', users.unblock);
router.post('/users/delete', users.delete);

//2. Reports
router.get('/reports', reports.list);
router.get('/reports/page/:page', reports.list);
router.post('/reports/verify-report-request', reports.verifyReportRequest);

//3. Notifications
router.get('/notifications', notifications.list);
router.get('/notifications/page/:page', notifications.list);
router.post('/notifications/insert', notifications.insert, pushNotificationsAll);
router.post('/notifications/delete', notifications.delete);

//4. Statistical
router.get('/statistical', statistical);
router.get('/export-xlsx', exportFile);

module.exports = router;
