const express = require("express");
const router = express.Router();
const report = require("../../controllers/api/reports.api");
const uploadFile = require("../../middlewares/uploadFile");

//Api
router.get("/list", report.list);
router.post("/insert", uploadFile.uploadFile, report.insert);

module.exports = router;