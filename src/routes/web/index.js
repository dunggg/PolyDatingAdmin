const express = require('express');
const router = express.Router();
const statistical = require('./statistical');
const utils = require('./utils');

//Web
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/statistical', statistical);

router.use('/utils', utils);

router.get('/reports', (req, res) => {
  res.render('reports');
});

router.get('/notifications', (req, res) => {
  res.render('notifications');
});

module.exports = router;
