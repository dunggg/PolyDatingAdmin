const express = require("express");
const user = require("../controllers/users.controller");
const router = express.Router();

//Web
router.get('/', user.list);
router.get('/:email', user.find);

module.exports = router;