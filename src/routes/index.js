const express = require('express');
const user = require("../controllers/users.controller");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/statistical', (req, res) => {
    res.render('statistical');
});

router.get('/users', user.list);

router.get('/user-details', (req, res) => {
    res.render('user-details');
});

router.get('/reports', (req, res) => {
    res.render('reports');
});

router.get('/notifications', (req, res) => {
    res.render('notifications');
});

module.exports = router;