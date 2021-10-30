const express = require("express");
const router = express.Router();
const user = require("../../controllers/api/users.api");
const uploadFile = require("../../middlewares/uploadFile");

//Api
router.get("/list", user.list);
router.get("/search", user.search);
router.post("/insert", uploadFile.uploadFile, user.insert);

module.exports = router;