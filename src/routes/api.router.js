const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const { sendMailNewUser, sendMailForgotPassword } = require('../middlewares/sendMail');
const masters = require("../controllers/api/masters.api");
const users = require("../controllers/api/users.api");
const friends = require("../controllers/api/friends.api");
const reports = require("../controllers/api/reports.api");

const fetch = require('node-fetch');

/* API */

// 1. Master
router.get("/master/list", masters.list);
router.use(getTimeZone);

router.post('/send', async (req, res) => {
    const nofiti = {
        'title': "Hello 123",
        'content': "Xin chao"
    }

    const token = [`cjaBMOb6Tg6ajy4PsxFl4p:APA91bHfXBfpmU0LHiX1rhk5MIUtLwIHczVnlRqKrwSmaSYUogvserOD2FM5UBI3hezVu5z6ulaj1lVbQS8dW6L8PdXY4FdRzreEQxDKQznVqh8D2KJtwZ7Al3cldEHZVOkZ7Zq5aoaV`];

    const nofibody = {
        'data': nofiti,
        "registration_ids": token
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': `key=AAAAMd_48v0:APA91bErb8B8aqTLeOTKyHVYuPtMagfrxYVhAkHB1gfMDPDI8ARHEBI4mjwqlheasCTlSgpZbHRaXPPMeUTzTNEPI1Mp_qzZNartaLkwfkk6ax1S-8jp5CgH5Y910T34gPwF2wZsQdbO`,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(nofibody)
    }).then(() => res.json(nofibody)).catch((err) => console.log(err))

});

// 2. Users
router.get("/users/list", users.list);
router.post("/users/sign_in", users.signIn);
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
router.post("/friends/friend_request", friends.friendRequest);
router.post("/friends/delete", friends.delete);

// 4. Reports
router.post("/reports/insert", uploadFile, reports.insert);

module.exports = router;