const express = require('express');
const user = require('../../controllers/web/users.web');
const router = express.Router();

//Web
router.get('/page/:page', user.list);
router.get('/:email', user.find);

module.exports = router;
