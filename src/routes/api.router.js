let express = require('express');
let router = express.Router();
let uploadFile = require('../middlewares/uploadFile');
let getTimeZone = require('../middlewares/getTime');
let { checkToken } = require('../middlewares/checkToken');
let { sendMailRequestCode } = require('../middlewares/sendMail');
let { pushNotificationsFriendsRequest } = require('../middlewares/notifications');
let masters = require('../controllers/api/masters.api');
let users = require('../controllers/api/users.api');
let friends = require('../controllers/api/friends.api');
let reports = require('../controllers/api/reports.api');
let notifications = require('../controllers/api/notifications.api');

/* API */
// 1. Master
router.get('/master/list', masters.list);

router.use(getTimeZone);
router.post('/users/sign-up', uploadFile, users.signUp);
router.post('/users/sign-in', users.signIn);
router.use(checkToken);

// 2. Users
router.get('/users/list', users.list);
router.post('/users/sign-out', users.signOut);
router.post('/users/update/images', uploadFile, users.updateImages);
router.post('/users/update/information', users.updateInformation);
router.post('/users/update/is-show', users.updateIsShow);
router.post('/users/update/status-hobby', users.updateStatusHobby);
router.post('/users/request-code', users.requestCode, sendMailRequestCode);
router.post('/users/delete', users.delete);

// 3. Friends
router.get('/friends/list-friends-requests', friends.listFriendsRequests);
router.get('/friends/list-of-requests-sent', friends.listOfRequestsSent);
router.get('/friends/list-friends', friends.listFriends);
router.post('/friends/friend-request', friends.friendRequest, pushNotificationsFriendsRequest);
router.post('/friends/delete', friends.delete);

// 4. Reports
router.post('/reports/insert', uploadFile, reports.insert);

// 5. Notifications
router.get('/notifications/list', notifications.list);
router.post('/notifications/delete', notifications.delete);

module.exports = router;
