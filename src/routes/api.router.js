const express = require("express");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile");
const master = require("../controllers/api/master.api");
const user = require("../controllers/api/users.api");
const favorite = require("../controllers/api/favorites.api");
const report = require("../controllers/api/reports.api");

/* API */

// 1. Master
router.get("/master/list", master.list);

// 2. Users
router.get("/users/list", user.list);
router.get("/users/find/:email", user.find);
router.post("/users/insert", uploadFile.uploadFile, user.insert);
router.post("/users/update/is_show", user.updateIsShow);
router.post("/users/update/images", uploadFile.uploadFile, user.updateImages);
// router.post("/users/delete/:_id", user.delete);

// 3. Favorites
router.get("/favorites/list/be_liked/:emailBeLiked", favorite.listBeLiked);
router.get("/favorites/list/liked/:emailLiked", favorite.listLiked);
router.post("/favorites/insert", favorite.insert);
router.post("/favorites/update", favorite.update);
router.post("/favorites/delete", favorite.delete);

// 4. Reports
router.post("/reports/insert", uploadFile.uploadFile, report.insert);

module.exports = router;