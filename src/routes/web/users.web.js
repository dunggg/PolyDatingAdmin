const express = require('express');
const router = express.Router();
const user = require('../../controllers/web/users.web');

//Web
router.post('/login', user.login);
router.get('/page/:page', user.list);
router.get('/:email', user.find);

module.exports = router;
