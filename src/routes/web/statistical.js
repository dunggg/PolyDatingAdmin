const express = require('express');
const router = express.Router();
const { statistical } = require('../../controllers/web/statistical.web');

router.get('/', statistical);

module.exports = router;
