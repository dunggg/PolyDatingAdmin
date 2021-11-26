const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const getTimeZone = require('../middlewares/getTime');
const { sendMailNewUser, sendMailForgotPassword } = require('../middlewares/sendMail');
const master = require("../controllers/api/master.api");
const user = require("../controllers/api/users.api");
const favorite = require("../controllers/api/favorites.api");
const report = require("../controllers/api/reports.api");

/* API */

// 1. Master
router.get("/master/list", master.list);

// 2. Users
router.get("/users/list", user.list);
router.post("/users/sign_in", user.signIn);
router.post("/users/sign_up", uploadFile, getTimeZone, user.signUp, sendMailNewUser);
router.post("/users/update/is_show", getTimeZone, user.updateIsShow);
router.post("/users/update/images", uploadFile, getTimeZone, user.updateImages);
router.post("/users/change_password", getTimeZone, user.changePassword);
router.post("/users/forgot_password", getTimeZone, user.forgotPassword, sendMailForgotPassword);
router.post("/users/delete", user.delete);

// 3. Favorites
router.get("/favorites/list/be_liked/:emailBeLiked", favorite.listBeLiked);
router.get("/favorites/list/liked/:emailLiked", favorite.listLiked);
router.post("/favorites/insert", favorite.insert);
router.post("/favorites/update", favorite.update);
router.post("/favorites/delete", favorite.delete);

// 4. Reports
router.post("/reports/insert", uploadFile, report.insert);

module.exports = router;