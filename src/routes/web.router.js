const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/uploadFile');
const getTimeZone = require('../middlewares/getTime');
const { sendMailForgotPassword } = require('../middlewares/sendMail');
const { pushNotificationsAll } = require('../middlewares/notifications');
const employees = require('../controllers/web/employees.web');
const users = require('../controllers/web/users.web');
const reports = require('../controllers/web/reports.web');
const notifications = require('../controllers/web/notifications.web');
const statistical = require('../controllers/web/statistical.web');

/* Website */
router.use(getTimeZone);

// 1. Employees
router.get('/', employees.index);
router.get('/employees', employees.list);
router.get('/employees/page/:page', employees.list);
router.post('/employees/insert', uploadFile, employees.insert);
router.post('/employees/block', employees.block);
router.post('/employees/unblock', employees.unblock);
router.post('/employees/delete', employees.delete);

//2. Users
router.get('/users', users.list);
router.get('/users/page/:page', users.list);
router.get('/users/:email', users.findOne);
router.post('/users/insert', uploadFile, users.insert);
router.post('/users/block', users.block);
router.post('/users/unblock', users.unblock);
router.post('/users/delete', users.delete);

//3. Reports
router.get('/reports', reports.list);
router.get('/reports/page/:page', reports.list);
router.post('/reports/verify-report-request', reports.verifyReportRequest);

//4. Notifications
router.get('/notifications', notifications.list);
router.get('/notifications/page/:page', notifications.list);
router.post(
  '/notifications/insert',
  notifications.insert,
  pushNotificationsAll,
);
router.post('/notifications/delete', notifications.delete);

//5. Statistical
router.get('/statistical', statistical.statistical);
const exportExecl = require('../utils/exportExcel');

router.get('/export-xlsx', (req, res, next) => {
  const fileName = exportExecl();
  res.render('download_xlsx', { fileName });
});

module.exports = router;
