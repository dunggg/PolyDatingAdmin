const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const { sendMailNewUser, sendMailForgotPassword } = require('../middlewares/sendMail');
const master = require("../controllers/api/master.api");
const user = require("../controllers/api/users.api");
const favorite = require("../controllers/api/favorites.api");
const friends = require("../controllers/api/friends.api");
const report = require("../controllers/api/reports.api");

const fetch = require('node-fetch');

/* API */

// 1. Master
router.get("/master/list", master.list);
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
router.get("/users/list", user.list);
router.post("/users/sign_in", user.signIn);
router.post("/users/sign_up", uploadFile, user.signUp, sendMailNewUser);
router.post("/users/update/images", uploadFile, user.updateImages);
router.post("/users/update/information", user.updateInformation);
router.post("/users/update/is_show", user.updateIsShow);
router.post("/users/update/status_hobby", user.updateStatusHobby);
router.post("/users/change_password", user.changePassword);
router.post("/users/forgot_password", user.forgotPassword, sendMailForgotPassword);
router.post("/users/delete", user.delete);

// 3. Favorites
router.get("/favorites/list/be_liked/:emailBeLiked", favorite.listBeLiked);
router.get("/favorites/list/liked/:emailLiked", favorite.listLiked);
router.post("/favorites/insert", favorite.insert);
router.post("/favorites/delete", favorite.delete);

// 4. Friends
router.get("/friends/list/:email", friends.list);
router.post("/friends/insert", friends.insert);
router.post("/friends/delete", friends.delete);

// 5. Reports
router.post("/reports/insert", uploadFile, report.insert);

module.exports = router;