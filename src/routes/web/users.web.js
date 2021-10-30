const express = require('express');
const router = express.Router();
const user = require('../../controllers/web/users.web');

//Web
router.post('/login', user.login);
router.get('/page/:page', user.list);
router.get('/:email', user.find);
router.post('/block/:_id', user.block);
router.post('/unblock/:_id', user.unblock);

module.exports = router;
