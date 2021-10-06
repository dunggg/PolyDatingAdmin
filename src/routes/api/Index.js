var express = require('express');
var router = express.Router();
var apiUser = require('./ApiUser')
var apiData = require('./ApiData')
/* GET users listing. */
router.use('/users', apiUser)
router.use('/data', apiData)

module.exports = router;
