const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const checkToken = require('../middlewares/checkToken');
const { sendMailRequestCode } = require('../middlewares/sendMail');
const { pushNotificationUser } = require('../middlewares/notifications');
const masters = require("../controllers/api/masters.api");
const users = require("../controllers/api/users.api");
const friends = require("../controllers/api/friends.api");
const reports = require("../controllers/api/reports.api");
const notifications = require("../controllers/api/notifications.api");

/* API */

// 1. Master
router.get("/master/list", masters.list);

router.post("/users/sign-up", uploadFile, users.signUp);
router.use(checkToken);
router.use(getTimeZone);

// 2. Users
router.get("/users/list", users.list);
router.post("/users/sign-in", users.signIn);
router.post("/users/sign-out", users.signOut);
router.post("/users/update/images", uploadFile, users.updateImages);
router.post("/users/update/information", users.updateInformation);
router.post("/users/update/is-show", users.updateIsShow);
router.post("/users/update/status-hobby", users.updateStatusHobby);
router.post("/users/request-code", users.requestCode, sendMailRequestCode);
router.post("/users/delete", users.delete);

// 3. Friends
router.get("/friends/list-friends-requests", friends.listFriendsRequests);
router.get("/friends/list-of-requests-sent", friends.listOfRequestsSent);
router.get("/friends/list-friends", friends.listFriends);
router.post("/friends/friend-request", friends.friendRequest, pushNotificationUser);
router.post("/friends/delete", friends.delete);

// 4. Reports
router.post("/reports/insert", uploadFile, reports.insert);

// 5. Notifications
router.get("/notifications/list", notifications.list);
router.post("/notifications/delete", notifications.delete);

module.exports = router;