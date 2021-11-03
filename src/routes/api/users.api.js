const express = require("express");
const router = express.Router();
const user = require("../../controllers/api/users.api");
const uploadFile = require("../../middlewares/uploadFile");

//Api
router.get("/list", user.list);
router.get("/find/:email", user.find);
router.post("/insert", uploadFile.uploadFile, user.insert);
// router.post("/delete/:_id", user.delete);

module.exports = router;