const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const { sendMailNewUser, sendMailForgotPassword } = require('../middlewares/sendMail');
const { pushNotificationUser } = require('../middlewares/notifications');
const masters = require("../controllers/api/masters.api");
const users = require("../controllers/api/users.api");
const friends = require("../controllers/api/friends.api");
const reports = require("../controllers/api/reports.api");
const notifications = require("../controllers/api/notifications.api");

/* API */

// 1. Master
router.get("/master/list", masters.list);
router.use(getTimeZone);

// 2. Users
router.get("/users/list", users.list);
router.post("/users/sign_in", users.signIn);
router.post("/users/sign_out", users.signOut);
router.post("/users/sign_up", uploadFile, users.signUp, sendMailNewUser);
router.post("/users/update/images", uploadFile, users.updateImages);
router.post("/users/update/information", users.updateInformation);
router.post("/users/update/is_show", users.updateIsShow);
router.post("/users/update/status_hobby", users.updateStatusHobby);
router.post("/users/change_password", users.changePassword);
router.post("/users/forgot_password", users.forgotPassword, sendMailForgotPassword);
router.post("/users/delete", users.delete);

// 3. Friends
router.get("/friends/list_friends_requests/:email", friends.listFriendsRequests);
router.get("/friends/list_of_requests_sent/:email", friends.listOfRequestsSent);
router.get("/friends/list_friends/:email", friends.listFriends);
router.post("/friends/friend_request", friends.friendRequest, pushNotificationUser);
router.post("/friends/delete", friends.delete);

// 4. Reports
router.post("/reports/insert", uploadFile, reports.insert);

// 5. Notifications
router.get("/notifications/list/:email", notifications.list);
router.post("/notifications/delete", notifications.delete);

module.exports = router;