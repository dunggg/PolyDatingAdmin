let express = require('express');
let router = express.Router();
let uploadFile = require('../middlewares/uploadFile');
let getTimeZone = require('../middlewares/getTime');
let { pushNotificationsAll } = require('../middlewares/notifications');
let users = require('../controllers/web/users.web');
let reports = require('../controllers/web/reports.web');
let notifications = require('../controllers/web/notifications.web');
let { statistical, exportFile } = require('../controllers/web/statistical.web');
let exportExcel = require('../utils/exportExcel');

/* Website */
router.use(getTimeZone);
router.get('/', users.index);
router.post('/login', users.login);
router.post('/users/insert', uploadFile, users.insert);

//1. Users
router.get('/users', users.list);
router.get('/users/page/:page', users.list);
router.get('/users/:email', users.findOne);
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
router.post(
  '/notifications/insert',
  notifications.insert,
  pushNotificationsAll,
);
router.post('/notifications/delete', notifications.delete);

//4. Statistical
router.get('/statistical', statistical);
router.get('/export-xlsx', exportFile);

router.get('/export-excel', (req, res, next) => {
  const fileName = exportExcel();
  res.json(fileName);
});

module.exports = router;
