const express = require("express");
const user = require("../../controllers/api/users.api.controller");
const router = express.Router();

//Api
router.get("/list", user.list);
router.get("/search", user.search);
router.post("/insert", user.insert);

module.exports = router;