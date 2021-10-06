var express = require('express');
var router = express.Router();
var userController = require('../../controllers/UserController');

router.post(
  '/login',
  userController.insert.bind(userController),
  userController.findUser.bind(userController),
);
router.post('/findUser', userController.findUser.bind(userController));
router.get('/', userController.listUser.bind(userController));

module.exports = router;
