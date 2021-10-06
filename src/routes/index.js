var express = require('express');
var router = express.Router();
var api = require('./api/Index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', api);

module.exports = router;
