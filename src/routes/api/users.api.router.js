const express = require("express");
const user = require("../../controllers/api/users.api.controller");
const router = express.Router();

//Api
router.get("/list", user.list);
router.post("/insert", user.insert);

module.exports = router;