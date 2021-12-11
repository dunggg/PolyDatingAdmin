const express = require('express');
const router = express.Router();
const statistical = require('./statistical');
const utils = require('./utils');
const moment = require('moment');

//Web
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.use('/statistical', statistical);

router.use('/utils', utils);

router.get('/reports', (req, res) => {
  res.render('reports', { timeStamp: moment().unix() });
});

router.get('/notifications', (req, res) => {
  res.render('notifications', { timeStamp: moment().unix() });
});

module.exports = router;
